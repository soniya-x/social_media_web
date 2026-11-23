
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
  [key: string]: unknown;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
