import express from "express";
import { registerUser,getUserProfile,loginUser,resetPassword,forgotPassword} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = express.Router();

// public route
router.post("/register", registerUser);
router.post("/login",loginUser)

//protected test route
router.get("/profile", authMiddleware, getUserProfile);

//forget password route
router.post("/forgot-password", forgotPassword);

// reset password route
router.post("/reset-password/:token", resetPassword);

export default router;
