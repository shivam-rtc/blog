import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

interface Post {
  _id: any;
  createdAt: string | number | Date;
  comments: any;
  author: string;
  id?: string;
  title: string;
  content: string;
  category: string[];
  status: "draft" | "published" | string;
  image: string;
}

interface BlogState {
  posts: Post[];
  postDetail: Post | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BlogState = {
  posts: [],
  postDetail: null,
  loading: false,
  error: null,
};

// Async thunk to create a new post
export const createPost = createAsyncThunk(
  "blog/createPost",
  async (postData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("createPost", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const allPosts = createAsyncThunk(
  "blog/allPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

export const getPostById = createAsyncThunk(
  "blog/getPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch post details"
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
      })
      .addCase(allPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(allPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetail = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
