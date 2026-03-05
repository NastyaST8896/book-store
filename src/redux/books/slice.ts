import { getBooks } from '@redux/books/thunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import type { Book, PaginationType } from '@utils/types';

type BooksState = {
  isLoading: boolean;
  books: Book[];
  activeFilters: {
    genres?: string[];
    priceRange?: [number, number];
    sortBy?: string;
  } | null;
  pagination: PaginationType;
  // maxPrice: number;
  // genres: Genre[];
};

const initialState: BooksState = {
  isLoading: false,
  books: [],
  activeFilters: null,
  pagination: {
    perPage: 8,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalPages: 1,
    totalAmount: 0
  },
  // maxPrice: Infinity,
  // genres: []
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        priceRange: action.payload,
      };
    },
    setGenres: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        genres: action.payload,
      };
    },

    setSortBy: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        sortBy: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // getBooks
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
        if(action.payload.pagination) {
          state.pagination = action.payload.pagination;
        };
      })
      .addCase(getBooks.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPriceRange, setGenres, setSortBy } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;