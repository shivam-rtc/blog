import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

interface Comment {
  user: {
    _id: string;
    name: string;
  };
  text: string;
  createdAt?: string;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Async thunk to add comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (
    { postId, text }: { postId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `/post/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.comments;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
