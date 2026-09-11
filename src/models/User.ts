import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  accessKeyId: string;
  secretAccessKey: string;
  username: string;
  email: string;
  arn: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    accessKeyId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    secretAccessKey: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    arn: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
