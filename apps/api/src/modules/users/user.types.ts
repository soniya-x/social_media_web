import { IUser } from "./user.model";

// Fields allowed when updating a user profile
export type UpdateUserProfileData = Partial<
  Pick<IUser, "fullName" | "username" | "bio" | "profileImage">
>;