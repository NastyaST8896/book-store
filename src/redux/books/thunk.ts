import { getBooksApi, type PaginationType } from '@redux/books/api.ts';
import type { RootState } from '@redux/store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { Book } from '@utils/types';

export const getBooks = createAsyncThunk<
  {
    books: Book[],
    pagination?: PaginationType
    // genres: Genre[],
    // maxPrice: number,
  },
  {
    page: number,
    genres?: string[],
    maxPrice?: number,
    minPrice?: number,
    sortBy?: string,
  },
  { state: RootState }
>(
  IN_APP_ROUTES.getBooks.pathName,
  async ({ page, genres, maxPrice, minPrice, sortBy }) => {

    const result = await getBooksApi(page, genres, maxPrice, minPrice, sortBy);
    return {
      books: result.data.books,
      pagination: result.meta?.pagination
    }
  }
);