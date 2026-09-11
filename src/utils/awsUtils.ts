import crypto from "crypto";

export const generateAccessKeyId = (): string => {
  return "AKIA" + crypto.randomBytes(8).toString("hex").toUpperCase();
};

export const generateSecretAccessKey = (): string => {
  return crypto.randomBytes(20).toString("base64");
};

export const generateArn = (username: string): string => {
  return `arn:aws:iam::123456789012:user/${username}`;
};
