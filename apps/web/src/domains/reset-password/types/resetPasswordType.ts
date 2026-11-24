export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordFormProps {
  token: string;
}
