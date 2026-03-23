import type { RootState } from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type {
  Book,
  Nullable,
  PaginationType,
} from '@utils/types';

import { getBooksApi } from '../../api/books-api';
import { setRating } from '../../api/rating-api.ts';

export const getBooks = createAsyncThunk<
  {
    books: Book[],
    pagination?: PaginationType
  },
  {
    page: Nullable<string>,
    genres: Nullable<string>,
    maxPrice: Nullable<string>,
    minPrice: Nullable<string>,
    sortBy: Nullable<string>,
    searchValue: Nullable<string>,
  },
  { state: RootState }
>(
  IN_APP_ROUTES.getBooks.pathName,
  async ({ page, genres, maxPrice, minPrice, sortBy, searchValue }) => {
    const result = await getBooksApi({
      ...(page && { page }),
      ...(genres && { genres }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(sortBy && { sortBy }),
      ...(searchValue && { searchValue })
    });

    return {
      books: result.data.books,
      pagination: result.meta?.pagination
    };
  });

export const setBookRating = createAsyncThunk<
  { booksRating: number, userRating: number},
  { bookId: number, rating: number },
  { state: RootState }
>(
  IN_APP_ROUTES.setBookRating.pathName,
  async ({ bookId, rating }) => {
    const result = await setRating({ bookId, rating });

    return result.data
  });