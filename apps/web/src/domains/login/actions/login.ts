import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUser } from "$domains/login";
import type { LoginFormData, LoginApiResponse } from "$domains/login";

export const loginAction = createAsyncThunk<
  LoginApiResponse,
  LoginFormData,
  { rejectValue: string }
>(
  "auth/login",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);

      // Store authentication data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } catch (error: unknown) {
      const message =
        (
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          }
        ).response?.data?.message || "Login failed. Please try again.";

      return rejectWithValue(message);
    }
  },
);
