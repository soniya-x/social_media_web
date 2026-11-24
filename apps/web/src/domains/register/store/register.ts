
import { createSlice } from "@reduxjs/toolkit";
import { registerAction } from "../actions/register";
import type { RegisterState } from "../types/registerType";

const initialState: RegisterState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
  message: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,

  reducers: {
    clearRegisterError: (state) => {
      state.error = null;
    },

    resetRegisterState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Registration request started
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })

      // Registration successful
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })

      // Registration failed
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error =
          action.payload || "Registration failed. Please try again.";
      });
  },
});

export const {
  clearRegisterError,
  resetRegisterState,
} = registerSlice.actions;

export default registerSlice.reducer;
