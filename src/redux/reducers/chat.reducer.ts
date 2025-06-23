import { createSlice } from "@reduxjs/toolkit";
import { ChatType } from "utils/types/chat.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const initialState: {
  chats: ChatType[];
} = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    insertChat: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
  },
});

export const { setChats, insertChat } = chatSlice.actions;

export default chatSlice.reducer;
