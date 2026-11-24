
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../services/register";
import type {
  RegisterRequest,
  RegisterApiResponse,
} from "../types/registerType";

export const registerAction = createAsyncThunk<
  RegisterApiResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  "register/register",

  async (registerData, { rejectWithValue }) => {
    try {
      const response = await registerUser(registerData);

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
        ).response?.data?.message ||
        "Registration failed. Please try again.";

      return rejectWithValue(message);
    }
  }
);
