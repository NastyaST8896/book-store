import { createSlice } from "@reduxjs/toolkit";
import { getBook } from "./thunk";
import type { Book } from "@utils/types";

  type BookState = {
  loading: boolean;
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
  loading: false,
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
          state.loading = true;
        })
        .addCase(getBook.fulfilled, (state, action) => {
          state.loading = false;
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
          state.loading = false;
        });
    }
  });

  export const bookReducer = bookSlice.reducer;