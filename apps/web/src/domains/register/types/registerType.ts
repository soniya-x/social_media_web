

export type RegisterRequest = RegisterFormData;
export interface RegisterFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisteredUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  user: RegisteredUser;
}

export interface RegisterState {
  user: RegisteredUser | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}
