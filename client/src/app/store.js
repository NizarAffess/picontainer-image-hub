import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import imageSlice from "../features/auth/images/imageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageSlice,
  },
});
