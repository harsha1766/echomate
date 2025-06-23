/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { ProfileType } from "utils/types/profile.types";

const initialState: {
  data: null | ProfileType;
} = {
  data: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
    },
    setProfilePosts: (state, action) => {
      if (state.data) state.data.posts = action.payload;
    },
    setProfileRequests: (state, action) => {
      if (state.data) {
        if (state.data.requests) {
          state.data.requests = [...state.data.requests,action.payload];
        } else {
          state.data.requests = [action.payload];
        }
      }
    }
  },
});

export const { setProfile, setProfilePosts, setProfileRequests } = profileSlice.actions;
export default profileSlice.reducer;
