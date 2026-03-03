import { getBooks } from '@redux/books/thunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import type { Book, Genre } from '@utils/types.ts';

type BooksState = {
  loading: boolean;
  books: Book[];
  activeFilters: {
    genres?: string[];
    priceRange?: [number, number];
    sortBy?: string;
  } | null;
  totalPages: number;
  minPrice: number;
  maxPrice: number;
  genres: Genre[];
};

const initialState: BooksState = {
  loading: false,
  books: [],
  activeFilters: null,
  totalPages: 1,
  minPrice: 0,
  maxPrice: Infinity,
  genres: []
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
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
        state.genres = action.payload.genres;
      })
      .addCase(getBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPriceRange, setGenres, setSortBy } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;