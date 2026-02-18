import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    loading: true,
    error: null,
  },
  reducers: {
    setCredentials: (s, a) => {
      s.user = {
        name: a.payload.name,
        email: a.payload.email,
      };
      s.token = a.payload.token;
      s.refreshToken = a.payload.refreshToken;
      s.error = null;
      s.loading = false;
    },
    logout: (s) => {
      s.user = null;
      s.token = null;
      s.refreshToken = null;
      s.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
