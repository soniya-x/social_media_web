import express from "express";
import { registerUser,getUserProfile } from "../controllers/user.controller";
import { loginUser } from "../controllers/login.controller";

import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

// public route
router.post("/register", registerUser);
router.post("/login",loginUser)

//protected test route
router.get("/profile", authMiddleware, getUserProfile);

export default router;
