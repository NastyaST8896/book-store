import { getBooks } from '@redux/books/thunk.ts';
import { createSlice } from '@reduxjs/toolkit';

type BookState = {
  loading: boolean;
};

const initialState: BookState = {
  loading: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBooks
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state) => {
        state.loading = false;
        // state.avatar = action.payload.
      })
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const booksReducer = booksSlice.reducer;