import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imagesService from "./imageService";

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createImage = createAsyncThunk(
  "/image/create",
  async (imageData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user.user;
      return await imagesService.createImage(token, imageData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images.push(action.payload);
      })
      .addCase(createImage.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = imageSlice.actions;
export default imageSlice.reducer;
