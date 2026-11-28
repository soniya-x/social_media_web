
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema ,type ProfileFormData } from "$domains/profile";
import { ProfileFormProps } from "../types/profileType";

export default function ProfileForm({
  initialValues,
  onCancel,
  onSubmit,
}: ProfileFormProps) {
  // Initialize the form with the current profile data
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Full Name */}
      <div className="space-y-1">
        <label
          htmlFor="fullName"
          className="text-sm font-medium"
        >
          Full Name
        </label>

        <input
          id="fullName"
          {...register("fullName")}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />

        {errors.fullName && (
          <p className="text-sm text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label
          htmlFor="username"
          className="text-sm font-medium"
        >
          Username
        </label>

        <input
          id="username"
          {...register("username")}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />

        {errors.username && (
          <p className="text-sm text-destructive">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <label
          htmlFor="bio"
          className="text-sm font-medium"
        >
          Bio
        </label>

        <textarea
          id="bio"
          rows={3}
          maxLength={150}
          {...register("bio")}
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm"
        />

        {errors.bio && (
          <p className="text-sm text-destructive">
            {errors.bio.message}
          </p>
        )}
      </div>

      {/* Cancel and Save buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
