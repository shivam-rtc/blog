import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

const API_URL = "http://localhost:4000/api/createPost";

interface Post {
  _id?: string;
  title: string;
  content: string;
  tags: string[];
  status: "draft" | "published" | string;
}

interface BlogState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk to create a new post
export const createPost = createAsyncThunk(
  "blog/createPost",
  async (postData: Post, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(API_URL, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload.post);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
