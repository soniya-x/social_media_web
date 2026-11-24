import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "$domains/login";
import type { AuthState } from "$domains/login";

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed. Please try again.";
      });
  },
});

export const { clearAuthError, logout } = loginSlice.actions;

export default loginSlice.reducer;
