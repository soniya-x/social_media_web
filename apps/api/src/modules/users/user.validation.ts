import { z } from "zod";

// Update user profile validation
export const updateUserProfileSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .optional(),

  username: z.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores")
    .optional(),

  bio: z.string()
    .trim()
    .max(150, "Bio cannot exceed 150 characters")
    .optional(),

  profileImage: z.string()
    .url("Please provide a valid profile image URL")
    .optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Please provide at least one field to update",
  }
);