import { Request, Response } from "express";
import { updateUserProfileSchema } from "./user.validation";
import {
  getUserProfileService,
  updateUserProfileService,
} from "../users/user.service";
import { uploadImageToCloudinary } from "../../shared/services/cloudinary.service";
import { updateProfileImageService } from "../users/user.service";
import { promises } from "dns";
import { success } from "zod";

// GET logged-in user's profile
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;

    const user = await getUserProfileService(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// UPDATE logged-in user's profile
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;

    // Validate incoming request body
    const validation = updateUserProfileSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: validation.error.issues[0].message,
      });
      return;
    }

    // Pass validated data to service
    const user = await updateUserProfileService(
      userId,
      validation.data
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("Update profile error:", error);

    if (error instanceof Error) {
      if (error.message === "USERNAME_ALREADY_EXISTS") {
        res.status(409).json({
          success: false,
          message: "Username already exists",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Upload logged-in user's profile image
export const uploadProfileImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = res.locals.userId;

    // Check whether an image was uploaded
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please select an image",
      });
      return;
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(req.file.buffer);

    // Save Cloudinary URL in MongoDB
    const user = await updateProfileImageService(userId, imageUrl);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      user,
    });
} catch (error) {
  console.error("Profile image upload error:", error);

  res.status(500).json({
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Failed to upload profile image",
  });
}


  // } catch (error) {
  //   console.error("Profile image upload error:", error);

  //   res.status(500).json({
  //     success: false,
  //     message: "Failed to upload profile image",
  //   });
  // }
};