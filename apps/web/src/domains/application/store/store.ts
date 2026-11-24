import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "@/domains/login/store/login";
import registerSlice from "@/domains/register/store/register";

export const store = configureStore({
  reducer: {
    user: loginSlice,
    register:registerSlice,
  }

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
