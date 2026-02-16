import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
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
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
