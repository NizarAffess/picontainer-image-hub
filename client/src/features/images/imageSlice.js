import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imagesService from "./imageService";

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const createImage = createAsyncThunk(
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

const getImages = createAsyncThunk("/images", async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user.user;
    return await imagesService.getImages(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getImage = createAsyncThunk("/image/:id", async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user.user;
    return await imagesService.getImage(token, id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

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
      })
      .addCase(getImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(getImage.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = imageSlice.actions;
export { createImage, getImages, getImage };
export default imageSlice.reducer;
