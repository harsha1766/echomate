import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import loadingReducer from "./reducers/loading.reducer";
import snackReducer from "./reducers/snack.reducer";
import socketReducer from "./reducers/socket.reducer";
import chatReducer from "./reducers/chat.reducer";
import profileReducer from "./reducers/profile.reducer";
import postReducer from "./reducers/post.reducer";
import peoplesReducer from "./reducers/peoples.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snack: snackReducer,
    loading: loadingReducer,
    socket: socketReducer,
    chats: chatReducer,
    profile: profileReducer,
    posts: postReducer,
    peoples: peoplesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
