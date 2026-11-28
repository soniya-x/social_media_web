
"use client";

import { useEffect, useState } from "react";
import { ImagePlus, MapPin, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import {
  createPost,
  createPostSchema,
  type CreatePostFormData,
  type CreatePostFormInput
} from "@/domains/posts";

import { getUserProfile } from "@/domains/profile/services/profileService";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  Input,
  UserAvatar,
} from "$domains/application";

export default function CreatePostPage() {
  // React Hook Form configuration
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormInput,any,CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      caption: "",
      location: "",
    },
  });

  // Watch selected image and caption
  const selectedImage = watch("image");
  const caption = watch("caption") || "";

  // Local UI states
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentUser, setCurrentUser] = useState<{
    fullName: string;
    username: string;
    profileImage: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create and clean up image preview URL
  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(selectedImage);
    setPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [selectedImage]);

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setValue("image", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Handle post submission after successful validation
  const handleShare = async (data: CreatePostFormData) => {
    try {
      setIsSubmitting(true);

      // Prepare image and post details
      const formData = new FormData();

      formData.append("image", data.image);
      formData.append("caption", data.caption || "");
      formData.append("location", data.location || "");

      // Send post data to backend
      const response = await createPost(formData);

      alert(response.message);

      // Reset form after successful post creation
      reset({
        caption: "",
        location: "",
      });

      if(fileInputRef.current){
        fileInputRef.current.value=""
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch logged-in user's profile details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getUserProfile();
        setCurrentUser(response.user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[650px] space-y-5 px-3 py-5 sm:px-5">

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
            <UserAvatar
              name={currentUser?.fullName || "User"}
              image={currentUser?.profileImage}
              className="h-11 w-11"
            />

            <div>
              <p className="text-sm font-semibold">
                {currentUser?.fullName || "Loading..."}
              </p>

              <p className="text-xs text-muted-foreground">
                @{currentUser?.username || ""}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleShare)}
            className="space-y-5"
          >

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Add Photo
              </label>

              {!preview ? (
                <label className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-5 transition hover:bg-muted/50">

                  <ImagePlus
                    size={42}
                    className="mb-3 text-muted-foreground"
                  />

                  <p className="text-sm font-semibold">
                    Select a photo
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose an image from your device
                  </p>

                  <span className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    Upload Image
                  </span>

                  <input
                  ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
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

              {errors.image && (
                <p className="text-sm text-destructive">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Caption
              </label>

              <Textarea
                placeholder="Write a caption..."
                {...register("caption")}
                maxLength={500}
                rows={4}
              />

              {errors.caption && (
                <p className="text-sm text-destructive">
                  {errors.caption.message}
                </p>
              )}

              <p className="text-right text-xs text-muted-foreground">
                {caption.length}/500
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Add Location
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  {...register("location")}
                  placeholder="Add location"
                  className="pl-10"
                />
              </div>

              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Share Button */}
            <Button
              type="submit"
              disabled={!selectedImage || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Sharing..." : "Share Post"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}

