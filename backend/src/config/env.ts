import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  CLIENT_URL: string;
}

export const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 5000,

  MONGO_URI: process.env.MONGO_URI || "",

  CLIENT_URL: process.env.CLIENT_URL || "",
};

if (!env.MONGO_URI) {
  throw new Error("MONGO_URI missing in .env");
}