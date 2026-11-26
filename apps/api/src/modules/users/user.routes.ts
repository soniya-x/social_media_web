
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage
} from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";

const router = express.Router();

// Protected user profile routes
router.get("/profile", authMiddleware, getUserProfile);
router.patch("/profile", authMiddleware, updateUserProfile);
// Upload profile image
router.post(
  "/profile/image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;
