
import { de } from "zod/v4/locales";
import Post from "./post.model";

//get all posts created by a specific user
export const getUserPostsService= async (userId:string)=>{
    const posts=await Post.find({user:userId})
    .sort({ createdAt:-1}) // show newest post first 
    .populate("user","fullName username profileImage");

    return  posts;
}

// create post services
export const createPostService=async(
    userId:string,
    image:string,
    caption:string,
    location:string
)=>{
    const post =await Post.create({
        user:userId,
        image,
        caption,
        location
    });

    // Return the post with its user details 
    return post.populate("user","fullName username profileImage")
};



// create Delete post Service
//Delete the post only if it belongs to the logged -in user
export const deletePostService=async(
    postId:string,
    userId:string
) =>{
    const deletedPost=await Post.findOneAndDelete({
        _id:postId,
        user:userId,
    });
    return deletedPost;
}

// Get a single post by its ID
export const getPostByIdService = async (postId: string) => {
  const post = await Post.findById(postId).populate(
    "user",
    "fullName username profileImage"
  );

  return post;
};

