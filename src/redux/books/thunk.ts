import { getBooksApi } from '@redux/books/api.ts';
import type { RootState } from '@redux/store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { Book, Genre } from '@utils/types';


export const getBooks = createAsyncThunk<
  { books: Book[], totalPages: number, genres: Genre[] },
  { page: number, genres?: string[] },
  { state: RootState }
>(
  IN_APP_ROUTES.getBooks.pathName,
  async ({ page, genres }, { rejectWithValue }) => {
    try {
      return await getBooksApi(page, genres);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);