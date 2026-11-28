// Post data returned by the backend
export interface Post {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    username: string;
    profileImage: string;
  };
  image: string;
  caption: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

// Response received when fetching user's posts
export interface GetMyPostsResponse {
  success: boolean;
  message: string;
  posts: Post[];
}

// Response received after creating a post
export interface CreatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}