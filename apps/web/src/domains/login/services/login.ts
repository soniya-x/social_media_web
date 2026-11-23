
import api from "@/lib/axios";
import { LoginFormData, type LoginApiResponse } from "$domains/login";

export const loginUser = async (
  credentials: LoginFormData
): Promise<LoginApiResponse> => {
  const response = await api.post<LoginApiResponse>(
    "/users/login",
    credentials
  );

  // Return only the data required by frontend
  return {
    token: response.data.token,
    user: response.data.user,
    message: response.data.message,
  };
};
