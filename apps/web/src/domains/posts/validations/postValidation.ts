import { z } from "zod";

export const createPostSchema = z.object({
  image: z
    .custom<File | undefined>(
      (file) => file instanceof File,
      { message: "Please select an image." }
    )
     .refine(
    (file): file is File => file instanceof File,
    "Please select an image."
  )
    .refine(
      (file) =>
        file instanceof File &&
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPG, PNG, and WEBP images are allowed."
    )
    .refine(
      (file) => file instanceof File && file.size <= 5 * 1024 * 1024,
      "Image size must be less than 5 MB."
    ),

  caption: z
    .string()
    .max(500, "Caption cannot exceed 500 characters.")
    .default(""),

  location: z
    .string()
    .max(100, "Location cannot exceed 100 characters.")
    .default(""),
});

// Input type: values before Zod validation
export type CreatePostFormInput = z.input<typeof createPostSchema>;

// Output type: values after Zod validation
export type CreatePostFormData = z.output<typeof createPostSchema>;