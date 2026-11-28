
import { z } from "zod";

// Validation schema for editing user profile
export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),

  bio: z
    .string()
    .max(150, "Bio cannot exceed 150 characters"),
});

// Type inferred from the Zod schema
export type ProfileFormData = z.infer<typeof profileSchema>;
