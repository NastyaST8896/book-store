import { createSlice } from "@reduxjs/toolkit";
import { addBookInCart } from "./thunk";

export type CartBookType = {
  id: number,
  title: string,
  author: string,
  price: string,
  media: string,
  count: number,
}

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

      // addBookInCart
      .addCase(addBookInCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookInCart.fulfilled, (state, action) => {
        console.log(action.payload.status)
        state.isLoading = false;
      })
      .addCase(addBookInCart.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const cartBooksReducer = booksSlice.reducer;