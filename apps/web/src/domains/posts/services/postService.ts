
import { GetMyPostsResponse,CreatePostResponse } from "$domains/posts";
import api from "@/lib/axios";
import type { Post } from "../types/postTypes";

//fetch posts created by the logged -in user 
export const getMyPosts=async():Promise<GetMyPostsResponse>=>{
  const response=await api.get<GetMyPostsResponse>("/posts/my-posts");
  return response.data;
}

// create the new post with image,caption and location
export const createPost=async(
     formData:FormData
): Promise<CreatePostResponse> =>{
    const response=await api.post<CreatePostResponse>(
        "/posts",
        formData
    );
    return response.data;
}

// Delete a post by its Id
export const deletePost = async (
  postId: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

// Get a single post by its ID
export const getPostById = async (
  postId: string
): Promise<Post> => {
  const response = await api.get<{ post: Post }>(
    `/posts/${postId}`
  );

  return response.data.post;
};