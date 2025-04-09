import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}


// ** Signup User **
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ** Login User **
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ** Google Login **
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  try {
    window.location.href = "http://localhost:4000/api/auth/google";
    return {}; 
  } catch (error) {
    console.log("Google login error:", error);
  }
});

// Helper function to extract query parameters
const getTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
};


// ** Logout User **
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || getTokenFromUrl() || null,
  loading: false,
  error: null,
};

if (getTokenFromUrl()) {
  localStorage.setItem("token", getTokenFromUrl() as string);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // Handle Google Login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
