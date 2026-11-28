import { z } from "zod";

export const deletePostSchema = z.object({
  postId: z
    .string()
    .min(1, "Post ID is required.")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID."),
});

// TypeScript type inferred from Zod schema
export type DeletePostFormData = z.infer<typeof deletePostSchema>;