import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@redux/store.ts";
import { getBookApi } from "./api";
import type { Book } from "@utils/types";

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
    recommended: Book[];
  },
  number,
  { state: RootState }
>(
  'book/id',
  async (id) => getBookApi(String(id))
);