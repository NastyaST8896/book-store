import type { RootState } from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { Book, PaginationType } from '@utils/types';

import { getBooksApi } from '../../api/books-api';

export const getBooks = createAsyncThunk<
  {
    books: Book[],
    pagination?: PaginationType
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

    const result = await getBooksApi({
      page,
      genres,
      maxPrice,
      minPrice,
      sortBy
    });

    return {
      books: result.data.books,
      pagination: result.meta?.pagination
    };
  });