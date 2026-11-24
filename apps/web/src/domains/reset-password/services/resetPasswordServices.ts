
import api from "@/lib/axios";
import type { ResetPasswordPayload } from "../types/resetPasswordType";

// Call backend reset-password API.
export const resetPasswordServices = async (
  token: string,
  data: ResetPasswordPayload
) => {
  const response = await api.post(
    `/users/reset-password/${token}`,
    data
  );

  return response.data;
};
