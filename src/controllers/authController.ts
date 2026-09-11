import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { generateAccessKeyId, generateSecretAccessKey, generateArn } from "../utils/awsUtils";
import { AuthRequest } from "../middlewares/authMiddleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User with this username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedSecret = await bcrypt.hash(password, salt);

    const accessKeyId = generateAccessKeyId();
    const arn = generateArn(username);

    const newUser = await User.create({
      username,
      email,
      accessKeyId,
      secretAccessKey: hashedSecret,
      arn,
      role: "user",
    });

    return res.status(201).json({
      message: "IAM User created successfully",
      credentials: {
        accessKeyId: newUser.accessKeyId,
        username: newUser.username,
        email: newUser.email,
        arn: newUser.arn,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessKeyId, secretAccessKey } = req.body;

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ message: "accessKeyId and secretAccessKey are required" });
    }

    const user = await User.findOne({ accessKeyId });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(secretAccessKey, user.secretAccessKey);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || "default_jwt_secret";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    const sessionToken = jwt.sign(
      {
        userId: user._id,
        accessKeyId: user.accessKeyId,
        arn: user.arn,
        role: user.role,
      },
      secret,
      { expiresIn: expiresIn as any }
    );

    return res.status(200).json({
      message: "Authentication successful",
      sessionToken,
      user: {
        accessKeyId: user.accessKeyId,
        arn: user.arn,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCallerIdentity = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json({
      UserId: user.userId,
      Account: "123456789012",
      Arn: user.arn,
      AccessKeyId: user.accessKeyId,
      Role: user.role,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
