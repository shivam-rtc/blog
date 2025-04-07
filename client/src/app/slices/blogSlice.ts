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

// user post
export const userPosts = createAsyncThunk(
  "blog/userPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/user/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your posts"
      );
    }
  }
);

// Async thunk to update a post
export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async (
    { id, updatedData }: { id: string; updatedData: any },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        `/updatePost/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.updatedPost;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update post"
      );
    }
  }
);

//  delete a post
export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`/deletePost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("delete response", response.data);
      return { id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete post"
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
      })
      .addCase(userPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(userPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
