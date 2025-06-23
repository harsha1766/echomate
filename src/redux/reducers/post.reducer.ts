/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "utils/types/post.types";

const initialState: {
  posts: PostType[];
} = {
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    removePosts: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { setPosts, addPosts, removePosts } = postSlice.actions;
export default postSlice.reducer;
