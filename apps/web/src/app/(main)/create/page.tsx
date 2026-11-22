"use client";

import { useEffect, useState } from "react";
import { ImagePlus, MapPin, X } from "lucide-react";


import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  Input,
  PostCard,
  UserAvatar,
} from "$domains/application";

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  // Create and clean up image preview URL
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [image]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
  };

  // Handle post submission
  const handleShare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    console.log({
      image,
      caption,
      location,
    });

    alert("Post created successfully!");

    setImage(null);
    setCaption("");
    setLocation("");
  };

  return (
    <div className="mx-aut w-full max-w-[650px] space-y-5 px-3 py-5 sm:px-5">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold">Create Post</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Share your moments with your community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New Post</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* User Details */}
          <div className="flex items-center gap-3">
            <UserAvatar name="Soniya Patidar" className="h-11 w-11" />

            <div>
              <p className="text-sm font-semibold">Soniya Patidar</p>

              <p className="text-xs text-muted-foreground">@soniya_patidar</p>
            </div>
          </div>

          <form onSubmit={handleShare} className="space-y-5">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Add Photo</label>

              {!preview ? (
                <label className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-5 transition hover:bg-muted/50">
                  <ImagePlus size={42} className="mb-3 text-muted-foreground" />

                  <p className="text-sm font-semibold">Select a photo</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose an image from your device
                  </p>

                  <span className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    Upload Image
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative overflow-hidden rounded-lg border">
                  <img
                    src={preview}
                    alt="Post preview"
                    className="max-h-[400px] w-full object-contain"
                  />

                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleRemoveImage}
                    className="absolute right-3 top-3 rounded-full"
                    aria-label="Remove image"
                  >
                    <X size={18} />
                  </Button>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Caption</label>

              <Textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={500}
                rows={4}
              />

              <p className="text-right text-xs text-muted-foreground">
                {caption.length}/500
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Add Location</label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Share Button */}
            <Button type="submit" disabled={!image} className="w-full">
              Share Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
