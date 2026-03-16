import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from '@redux/store';
import { IN_APP_ROUTES } from "@utils/routes";
import { addCartBook } from "../../api/cartBook-api";

export const addBookInCart = createAsyncThunk<
  { status: string },
  { bookId: number },
  { state: RootState }
>(
  IN_APP_ROUTES.addBookInCart.pathName,
  async ({ bookId }) => {
    const result = await addCartBook(bookId);

    return result.data
  });