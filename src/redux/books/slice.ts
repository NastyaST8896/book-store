import { getBooks, setBookRating } from '@redux/books/thunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import type { Book, PaginationType } from '@utils/types';

type BooksState = {
  isLoading: boolean;
  books: Book[];
  pagination: PaginationType;
};

const initialState: BooksState = {
  isLoading: false,
  books: [],
  pagination: {
    perPage: 8,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalPages: 1,
    totalAmount: 0
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBooks
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getBooks.rejected, (state) => {
        state.isLoading = false;
      })

      // setBookRating
      .addCase(setBookRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBookRating.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setBookRating.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const booksReducer = booksSlice.reducer;