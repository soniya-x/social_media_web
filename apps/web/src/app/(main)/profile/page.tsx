"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ProfileHeader } from "$domains/application";
import { profilePosts } from "@/features/profile/data/profilePost";

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
} from "$domains/profile/services/profileService";

import type { UserProfile } from "$domains/profile/types/profileType";
import type { ProfileFormData } from "@/domains/profile/types/ProfileSchema";

import ProfileForm from "@/domains/profile/components/ProfileForm";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch logged-in user's profile
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

  // Automatically hide messages after 3 seconds
useEffect(() => {
  if (!updateMessage) return;

  const timer = setTimeout(() => {
    setUpdateMessage("");
  }, 3000);

  return () => clearTimeout(timer);
}, [updateMessage]);

  // Update profile details
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

  // Upload selected profile image
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Allow only common image formats
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUpdateMessage("Please select a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    // Check image size (5 MB maximum)
    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    setUpdateMessage("");

    try {
      const response = await uploadProfileImage(file);

      // Update profile state with the new Cloudinary image URL
      setProfile(response.user);
      setUpdateMessage("Profile picture updated successfully!");
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      setUpdateMessage("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);

      // Allow selecting the same image again
      event.target.value = "";
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
      {/* Hidden input for profile image selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Show edit form or profile header */}
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
          posts={profilePosts.length}
          followers={profile.followers.length}
          following={profile.following.length}
          profileImage={profile.profileImage}
          onEdit={() => setIsEditing(true)}
          onImageClick={() => fileInputRef.current?.click()}
        />
      )}

      {/* Upload status and update messages */}
      {(updateMessage || isUploading) && (
        <p className="text-center text-sm">
          {isUploading ? "Uploading profile picture..." : updateMessage}
        </p>
      )}

      {/* Profile Navigation */}
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

     
     
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {profilePosts.map((post) => (
          <div key={post.id} className="aspect-square w-full overflow-hidden">
            <img
              src={post.image}
              alt="Profile post"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
