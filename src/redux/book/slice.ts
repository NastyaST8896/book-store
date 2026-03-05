import { createSlice } from "@reduxjs/toolkit";
import { getBook } from "./thunk";
import type { Book } from "@utils/types";

  type BookState = {
  isLoading: boolean;
  book: {
    id: number;
    title: string;
    author: string;
    price: string;
    rating: number;
    media?: string;
    isFavorite?: boolean;
    description: string;
  };
  recommended: Book[];
};

const initialState: BookState = {
  isLoading: false,
  book: {
    id: 0,
    title: '',
    author: '',
    price: '',
    rating: 0,
    media: '',
    isFavorite: false,
    description: '',
  },
  recommended: [],
}

  export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBook.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBook.fulfilled, (state, action) => {
          state.isLoading = false;
          state.book = {
            id: action.payload.id,
            title: action.payload.title,
            author: action.payload.author,
            price: action.payload.price,
            rating: action.payload.rating,
            media: action.payload.media,
            description: action.payload.description,
          };
          state.recommended = action.payload.recommended;
        })
        .addCase(getBook.rejected, (state) => {
          state.isLoading = false;
        });
    }
  });

  export const bookReducer = bookSlice.reducer;