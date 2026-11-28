// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  token: string;
  user: Record<string, unknown>;
  message?: string;
}

export type LoginActionResult =
  | {
      success: true;
      message: string;
      user: Record<string, unknown>;
    }
  | {
      success: false;
      message: string;
    };


export interface AuthUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
