import dotenv from "dotenv";
import path from "path";

// Load environment variables
 const result=dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
// console.log("ENV FILE PATH:", path.resolve(process.cwd(), ".env"));
// console.log("ENV FILE LOADED:", !result.error);
// console.log("JWT SECRET EXISTS:", Boolean(process.env.JWT_SECRET)); 


// Centralized environment configuration
const env = {
  PORT: process.env.PORT || 5001,

  MONGODB_URL: process.env.MONGODB_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;