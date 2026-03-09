import type { RootState } from '@redux/store.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Book, BookProfile } from '@utils/types';

import { getBookApi } from '../../api/book-api';

export const getBook = createAsyncThunk<
  {
    book: BookProfile,
    recomended: Book[]
  },
  number,
  { state: RootState }
>(
  'book/id',
  async (id) => {
    const result = await getBookApi(String(id));

    return {
      book: result.data.book,
      recomended: result.data.recommended
    };
  }
);