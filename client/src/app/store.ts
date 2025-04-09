import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/slices/authSlice";
import blogReducer from "../app/slices/blogSlice"
import commentsReducer from "../app/slices/commentsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
