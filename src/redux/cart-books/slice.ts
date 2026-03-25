import { createSlice } from '@reduxjs/toolkit';

import { getCartBooks } from './thunk';

export type CartBookType = {
  id: number,
  title: string,
  author: string,
  price: string,
  media: string,
  count: number,
  availableCount: number,
};

type CartBooksState = {
  isLoading: boolean;
  books: CartBookType[];
  totalPrice: number;
};

const initialState: CartBooksState = {
  isLoading: false,
  books: [],
  totalPrice: 0,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  getCartBooks
      .addCase(getCartBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(getCartBooks.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const cartBooksReducer = booksSlice.reducer;