/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommended: [],
  loading: false,
  error: null,
};
export const fetchRecommended = createAsyncThunk(
  "books/fetchRecommended",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const data = await getRecommendedBooks(token);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchRecommended.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchRecommended.fulfilled, (s, a) => {
      s.loading = false;
      s.recommended = a.payload;
    });
    b.addCase(fetchRecommended.rejected, (s, a) => {
      s.loading = true;
      s.error = a.payload || a.error.message;
    });
  },
});

export default booksSlice.reducer;
 */
