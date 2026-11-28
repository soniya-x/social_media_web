
"use client";

import { Trash2 } from "lucide-react";

import { EmptyState } from "$domains/application";
import type { Post } from "../types/postTypes";

interface PostGridProps {
  posts: Post[];
  loading: boolean;
  deletingPostId: string | null;
  onDelete: (postId: string) => void;
  onPostClick: (postId: string) => void;
}

export default function PostGrid({
  posts,
  loading,
  deletingPostId,
  onDelete,
  onPostClick,
}: PostGridProps) {
  // Show loading state while posts are being fetched
  
  if (loading) {
    return (
      <p className="col-span-3 py-8 text-center">
        Loading posts...
      </p>
    );
  }

  // Show empty state when the user has no posts
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts yet"
        description="Share your first post with your followers."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="group relative aspect-square w-full overflow-hidden"
        >
          {/* Click image to open individual post */}
          <button
            type="button"
            onClick={() => onPostClick(post._id)}
            className="block h-full w-full"
            aria-label="View post"
          >
            <img
              src={post.image}
              alt={post.caption || "Profile post"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={() => onDelete(post._id)}
            disabled={deletingPostId === post._id}
            aria-label="Delete post"
            title="Delete post"
            className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white opacity-100 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>

          {/* Show deleting state */}
          {deletingPostId === post._id && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
              Deleting...
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
