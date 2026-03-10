import type { RootState } from '@redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { Book, Nullable, PaginationType } from '@utils/types';

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
  },
  { state: RootState }
>(
  IN_APP_ROUTES.getBooks.pathName,
  async ({ page, genres, maxPrice, minPrice, sortBy }) => {
    const result = await getBooksApi({
      ...(page && { page }),
      ...(genres && { genres }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(sortBy && { sortBy }),
    });

    return {
      books: result.data.books,
      pagination: result.meta?.pagination
    };
  });

export const setBookRating = createAsyncThunk<
  { booksRating: number },
  { bookId: number, userId: number, rating: number },
  { state: RootState }
>(
  IN_APP_ROUTES.setBookRating.pathName,
  async ({ bookId, userId, rating }) => {
    const result = await setRating({bookId, userId, rating});

    return result.data
  });