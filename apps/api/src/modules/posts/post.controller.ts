import type { Request, Response } from "express";
import { getUserPostsService,createPostService,deletePostService } from "./post.service";
import { uploadImageToCloudinary } from "../../shared/services/cloudinary.service";
import {
  getPostByIdService,
} from "./post.service";


//get posts create by the logged-in user
export const getUserPosts=async(
    _req:Request,
    res:Response
): Promise<void>=>{
    try{
        //get authenticated user's ID from auth middleware
        const userId=res.locals.userId;
        console.log("Create Post User ID:", userId);

        //fecth user's posts from the database
        const posts=await getUserPostsService(userId);

        res.status(200).json({
            success:true,
            message:"User posts fetched successfully",
            posts,
        });

    } catch(error){
        console.error("Get user posts error:" ,error)

        res.status(500).json({
            success:false,
            message:"Failed to fetch user posts"
        })
    }
}


// create post 
export const createPost=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try{
         //get logged-in user's ID from auth middleware
         const userId=res.locals.userId;

         //get uploaded image from multer
         const file=req.file;

        // check whether an image was selected
        if(!file){
            res.status(400).json({
                success:false,
                message:"Please uploaded an image"
            });
            return;
        }
        //get caption and location from the request body 
        const {caption,location}=req.body;

        //upload image to cloudinary 
        const imageUrl=await uploadImageToCloudinary(
            file.buffer,
            "socialgram/post-images"
        );

        //save post details  in mongodb
        const post=await createPostService(
            userId,
            imageUrl,
            caption || "",
            location || ""
        );
        res.status(201).json({
            success:true,
            message:"Post created successfully",
            post,
        });

    }catch(error){
        console.error("Create post error:",error)

        res.status(500).json({
            success:false,
            message:"Failed to create post"
        })
    }
}

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response
) => {
  try {
    const postId = req.params.postId;

    if (typeof postId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID.",
      });
    }

    const userId = res.locals.userId;

    const deletedPost = await deletePostService(
      postId,
      userId
    );

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found or you are not authorized to delete it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete post.",
    });
  }
};

// // Get a single post by its ID
export const getPostById = async (
  req: Request,
  res: Response
) => {
  try {
    const postId = req.params.postId;

if (typeof postId !== "string") {
  return res.status(400).json({
    success: false,
    message: "Invalid post ID.",
  });
}

    // Validate MongoDB ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID.",
      });
    }

    const post = await getPostByIdService(postId);

    // Check whether the post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post fetched successfully.",
      post,
    });
  } catch (error) {
    console.error("Get post by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch post.",
    });
  }
};


