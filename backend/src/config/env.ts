import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  CLIENT_URL: string;

  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;

  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_FROM: string;
}

export const env: EnvConfig = {
  NODE_ENV:
    process.env.NODE_ENV ||
    "development",

  PORT:
    Number(process.env.PORT) ||
    5000,

  MONGO_URI:
    process.env.MONGO_URI || "",

  CLIENT_URL:
    process.env.CLIENT_URL || "",

  CLOUDINARY_CLOUD_NAME:
    process.env.CLOUDINARY_CLOUD_NAME || "",

  CLOUDINARY_API_KEY:
    process.env.CLOUDINARY_API_KEY || "",

  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET || "",

  SMTP_HOST: process.env.SMTP_HOST || "",

  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,

  SMTP_SECURE:
    process.env.SMTP_SECURE === "true",

  SMTP_USER: process.env.SMTP_USER || "",

  SMTP_PASS: process.env.SMTP_PASS || "",

  SMTP_FROM: process.env.SMTP_FROM || "",
};

if (!env.MONGO_URI) {
  throw new Error("MONGO_URI missing in .env");
}