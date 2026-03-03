import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@redux/store.ts";
import { getBookApi } from "./api";

export const getBook = createAsyncThunk<
  {
    id: number;
    title: string;
    author: string;
    price: string;
    rating: number;
    media?: string;
    isFavorite?: boolean;
    description: string;
  },
  number,
  { state: RootState }
>(
  'book/id',
  async (id, { rejectWithValue }) => {
    try {
      console.log('>>id', id);
      console.log('>> typof', typeof id)
      return getBookApi(String(id));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);