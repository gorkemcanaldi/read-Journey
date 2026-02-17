import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (s, a) => {
      s.user = a.payload.user;
      s.token = a.payload.token;
    },
    logout: (s) => {
      s.user = null;
      s.token = null;
      localStorage.removeItem("token");
    },
    setLoading: (s, a) => {
      s.loading = a.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
