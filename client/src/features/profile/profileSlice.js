import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  profile: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const getUserProfile = createAsyncThunk(
  "/user/profile",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user.user;
      return await profileService.getProfile(token);
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

const addProfileInfo = createAsyncThunk(
  "/user/profile/update",
  // async (thunkAPI, profileData) => {
  // the previous declaration didn't come up with a response.
  // The order MATTERS here!! Never pass the thunkAPI as the first parameter.
  async (profileData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user.user;
      console.log(profileData);
      return await profileService.addProfileInfo(token, profileData);
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

const saveImage = createAsyncThunk("/image/save", async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user.user;
    return await profileService.saveImage(token, id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addProfileInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(addProfileInfo.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(saveImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (
          !state.profile.saved.some(
            (image) => image._id === action.payload.image._id
          )
        ) {
          console.log(action.payload);
          state.profile.saved.push(action.payload.image);
        } else {
          state.profile.saved = [...state.profile.saved].filter(
            (item) => item._id !== action.payload.image._id
          );
        }
      })
      .addCase(saveImage.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export { getUserProfile, addProfileInfo, saveImage };
export default profileSlice.reducer;
