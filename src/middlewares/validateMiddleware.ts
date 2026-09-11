import { Request, Response, NextFunction } from "express";

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({
      message: "Validation Error: Username must be at least 3 characters long",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "Validation Error: Invalid email format",
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "Validation Error: Password must be at least 6 characters long",
    });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { accessKeyId, secretAccessKey } = req.body;

  if (!accessKeyId || typeof accessKeyId !== "string") {
    return res.status(400).json({
      message: "Validation Error: accessKeyId is required",
    });
  }

  if (!secretAccessKey || typeof secretAccessKey !== "string") {
    return res.status(400).json({
      message: "Validation Error: secretAccessKey is required",
    });
  }

  next();
};
