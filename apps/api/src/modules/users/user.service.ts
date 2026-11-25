import User from "./user.model";
import type { UpdateUserProfileData } from "./user.types";
import type { IUser } from "./user.model";
import { use } from "react";

// Exclude sensitive fields from the API response
const getSafeUser = (user: IUser) => {
  const safeUser = user.toObject();

  delete safeUser.password;
  delete safeUser.resetPasswordToken;
  delete safeUser.resetPasswordExpires;

  return safeUser;
};

// Get logged-in user's profile
export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId).select(
    "-password -resetPasswordToken -resetPasswordExpires"
  );

  return user;
};

// Update logged-in user's profile
export const updateUserProfileService = async (
  userId: string,
  data: UpdateUserProfileData
) => {
  // Check whether at least one field is provided
  if (Object.keys(data).length === 0) {
    throw new Error("NO_FIELDS_TO_UPDATE");
  }

  // Find the user
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  // Check username availability
  if (data.username !== undefined && data.username !== user.username) {
    const existingUser = await User.findOne({
      username: data.username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    }
  }

  // Update only provided fields
  if (data.fullName !== undefined) {
    user.fullName = data.fullName;
  }

  if (data.username !== undefined) {
    user.username = data.username;
  }

  if (data.bio !== undefined) {
    user.bio = data.bio;
  }

  if (data.profileImage !== undefined) {
    user.profileImage = data.profileImage;
  }

  // Save changes
  await user.save();

  // Return user without sensitive information
  return getSafeUser(user);
};

//update logged-in user's profile image 
export const updateProfileImageService=async(
  userId:string,
  imageUrl:string
)=>{
  const user=await User.findById(userId)

  if(!user){
    return null;
  }

  //save cloudinary image url in mongodb
 user.profileImage=imageUrl;
 await user.save();
 return getSafeUser(user)
};
