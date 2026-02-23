import { getBooksApi } from '@redux/books/api.ts';
import type { RootState } from '@redux/store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { Book } from '@utils/types';



export const getBooks = createAsyncThunk<
  { books: Book[], totalPages: number },
  void,
  { state: RootState }
>(
  IN_APP_ROUTES.getBooks.pathName,
  async (_, { rejectWithValue }) => {
    try {
      return await getBooksApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)
;