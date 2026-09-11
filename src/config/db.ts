import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connUri = process.env.MONGODB_URI || "mongodb://localhost:27017/aws-auth-system";
    await mongoose.connect(connUri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};
