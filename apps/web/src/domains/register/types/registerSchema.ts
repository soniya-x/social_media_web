
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must contain at least 3 characters")
      .max(50, "Full name cannot exceed 50 characters"),

    username: z
      .string()
      .trim()
      .min(3, "Username must contain at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscores"
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(254, "Email address is too long")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(128, "Password cannot exceed 128 characters")
      .regex(/[a-z]/, "At least one lowercase letter is required")
      .regex(/[A-Z]/, "At least one uppercase letter is required")
      .regex(/[0-9]/, "At least one number is required")
      .regex(
        /[^A-Za-z0-9]/,
        "At least one special character is required"
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
   // refine:We need to compare two fields: password and confirmPassword.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
