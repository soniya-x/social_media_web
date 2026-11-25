import { ProfileFormData } from "./ProfileSchema";
// Represents the user profile returned by the backend
export interface UserProfile {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
}

// API response for fetching the logged-in user's profile
export interface ProfileApiResponse {
  success: boolean;
  message: string;
  user: UserProfile;
}
 export interface ProfileFormProps {
  initialValues: ProfileFormData;
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}