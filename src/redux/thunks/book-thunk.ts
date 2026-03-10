import type { RootState } from '@redux/store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Book, BookProfile, Nullable } from '@utils/types';

import { getBookApi } from '../../api/book-api';

export const getBook = createAsyncThunk<
  {
    book: BookProfile,
    recomended: Book[]
  },
  { id: string, userId: Nullable<string> },
  { state: RootState }
>(
  'book/id',
  async ({ id, userId }) => {
    const result = await getBookApi({
      id,
      ...(userId && { userId }),
    });

    return {
      book: result.data.book,
      recomended: result.data.recommended
    };
  }
);