import {Router} from "express";
import { getUserPosts,createPost, deletePost} from "./post.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";
import {
  getPostById,
} from "./post.controller";

const router=Router();

//Get posts belonging to the logged-in user
router.get("/my-posts",authMiddleware,getUserPosts);
// Create a new post (protected route)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);
router.delete("/:postId",authMiddleware,deletePost)
router.get("/:postId", authMiddleware, getPostById);

export default router;