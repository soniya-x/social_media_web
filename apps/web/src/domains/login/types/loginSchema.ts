import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email address is too long")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must contain at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .regex(/[a-z]/, "At least one lowercase letter is required")
    .regex(/[A-Z]/, "At least one uppercase letter is required")
    .regex(/[0-9]/, "At least one number is required")
    .regex(
      /[^A-Za-z0-9]/,
      "At least one special character is required"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;