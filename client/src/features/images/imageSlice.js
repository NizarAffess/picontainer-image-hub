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

const getImages = createAsyncThunk("/images", async (user, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user.user;
    return await imagesService.getImages(user, token);
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

const deleteImage = createAsyncThunk("/image/delete", async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user.user;
    return await imagesService.deleteImage(token, id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const updateImage = createAsyncThunk(
  "/image/update",
  async (id, imageData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user.user;
      return await imagesService.updateImage(token, id, imageData);
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
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = state.images.filter(
          (image) => image._id !== action.payload.id
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images.push(action.payload);
      })
      .addCase(updateImage.rejected, (state, action) => {
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
export { createImage, getImages, getImage, deleteImage, updateImage };
export default imageSlice.reducer;
