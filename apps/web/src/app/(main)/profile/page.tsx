
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ProfileHeader,
  ConfirmDialog,
} from "$domains/application";

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "$domains/profile/services/profileService";

import {
  getMyPosts,
  deletePost,
  deletePostSchema,
  PostGrid,
  type Post,
} from "$domains/posts";

import type { UserProfile } from "$domains/profile/types/profileType";
import type { ProfileFormData } from "@/domains/profile";
import ProfileForm from "@/domains/profile/components/ProfileForm";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Delete post states
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getMyPosts();
        setPosts(response.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts. Please try again.");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Automatically hide update messages
  useEffect(() => {
    if (!updateMessage) return;

    const timer = setTimeout(() => {
      setUpdateMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [updateMessage]);

  // Update profile
  const handleUpdateProfile = async (data: ProfileFormData) => {
    setUpdateMessage("");

    try {
      const response = await updateUserProfile(data);

      setProfile(response.user);
      setIsEditing(false);
      setUpdateMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setUpdateMessage("Failed to update profile. Please try again.");
      throw error;
    }
  };

  // Upload profile image
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUpdateMessage("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    setUpdateMessage("");

    try {
      const response = await uploadProfileImage(file);

      setProfile(response.user);
      setUpdateMessage("Profile picture updated successfully!");
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      setUpdateMessage("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  // Delete selected post
  const handleDeletePost = async () => {
    if (!selectedPostId) return;

    // Validate post ID
    const result = deletePostSchema.safeParse({
      postId: selectedPostId,
    });

    if (!result.success) {
      alert("Invalid post ID.");
      setSelectedPostId(null);
      return;
    }

    try {
      setDeletingPostId(selectedPostId);

      // Call delete API
      await deletePost(result.data.postId);

      // Remove post from UI
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== selectedPostId)
      );

      // Close confirmation dialog
      setSelectedPostId(null);
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeletingPostId(null);
    }
  };

  if (loading) {
    return <p className="text-center">Loading profile...</p>;
  }

  if (error || !profile) {
    return (
      <p className="text-center text-destructive">
        {error || "Profile not found"}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-[850px] space-y-8">

      {/* Profile image input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Profile header or edit form */}
      {isEditing ? (
        <ProfileForm
          initialValues={{
            fullName: profile.fullName,
            username: profile.username,
            bio: profile.bio,
          }}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdateProfile}
        />
      ) : (
        <ProfileHeader
          name={profile.fullName}
          username={profile.username}
          bio={profile.bio}
          posts={posts.length}
          followers={profile.followers.length}
          following={profile.following.length}
          profileImage={profile.profileImage}
          onEdit={() => setIsEditing(true)}
          onImageClick={() => fileInputRef.current?.click()}
        />
      )}

      {/* Update messages */}
      {(updateMessage || isUploading) && (
        <p className="text-center text-sm">
          {isUploading ? "Uploading profile picture..." : updateMessage}
        </p>
      )}

      {/* Profile navigation */}
      <div className="flex justify-center gap-12 border-b">
        <button className="border-t-2 border-foreground px-4 py-4 text-sm font-semibold">
          POSTS
        </button>

        <button className="px-4 py-4 text-sm text-muted-foreground">
          SAVED
        </button>

        <button className="px-4 py-4 text-sm text-muted-foreground">
          TAGGED
        </button>
      </div>

      {/* Reusable Post Grid */}
      <PostGrid
        posts={posts}
        loading={postsLoading}
        deletingPostId={deletingPostId}
        onDelete={setSelectedPostId}
        onPostClick={(postId)=>router.push(`/posts/${postId}`)}
      />

      {/* Reusable confirmation dialog */}
      <ConfirmDialog
        open={selectedPostId !== null}
        title="Delete Post?"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deletingPostId !== null}
        onConfirm={handleDeletePost}
        onCancel={() => setSelectedPostId(null)}
      />

    </div>
  );
}
