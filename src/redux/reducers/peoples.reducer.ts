import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "utils/types/user.types";

const initialState: {
  data: UserType[]
} = {
  data: [],
};

export const peoplesSlice = createSlice({
  name: "peoples",
  initialState,
  reducers: {
    setPeoples: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { setPeoples } = peoplesSlice.actions;

export default peoplesSlice.reducer;
