"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button, useAppSelector,PostCard} from "$domains/application";
import { getPostById, type Post } from "$domains/posts";

export default function SinglePostPage() {
  const params = useParams<{ postId: string }>();
  const router = useRouter();

  const postId = params.postId;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPostById(postId);
        setPost(response);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <p className="py-10 text-center">Loading post...</p>;
  }

  if (error || !post) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-destructive">
          {error || "Post not found."}
        </p>

        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Check whether the logged-in user owns this post.
  const isOwnPost = currentUser?._id === post.user._id;

  return (
    <div className="mx-auto max-w-[600px] space-y-4">
      <Button variant="ghost" onClick={() => router.back()}>
        ← Back
      </Button>

      <PostCard
        username={post.user.username}
        name={post.user.fullName}
        caption={post.caption}
        time={new Date(post.createdAt).toLocaleDateString()}
        likes={0}
        comments={0}
        image={post.image}
        postId={post._id}
        isOwnPost={isOwnPost}
      />
    </div>
  );
}
