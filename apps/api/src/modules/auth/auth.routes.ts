
import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  googleLogin
} from "./auth.controller";

const router = express.Router();

// Public authentication routes
router.post("/google", googleLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
