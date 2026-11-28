
import api from "@/lib/axios";
import type {
  ProfileApiResponse,
} from "../types/profileType";
import type { ProfileFormData } from "../types/ProfileSchema";


// Fetch the logged-in user's profile from the backend
export const getUserProfile = async (): Promise<ProfileApiResponse> => {
  const response = await api.get<ProfileApiResponse>(
    "/users/profile"
  );

  return response.data;
};

//update the logged-in user's profile
export const updateUserProfile=async(
  data:ProfileFormData):Promise<ProfileApiResponse>=>{
    const response=await api.patch<ProfileApiResponse>(
      '/users/profile',
      data
    )
    return response.data;
  }

//upload profile image
export const uploadProfileImage=async(
  file:File

): Promise<ProfileApiResponse>=>{
  const formData=new FormData();

  //append image using the same field name as multer
  formData.append("profileImage",file)

  const response=await api.post<ProfileApiResponse>(
    "/users/profile/image",
    formData
  );
return response.data;

}
