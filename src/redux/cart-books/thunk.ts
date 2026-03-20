import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from '@redux/store';
import { IN_APP_ROUTES } from "@utils/routes";
import { addCartBook, getBooksFromCart } from "../../api/cartBook-api";
import type { CartBookType } from "./slice";

export const addBookInCart = createAsyncThunk<
  { status: string },
  { bookId: number, quantity: number },
  { state: RootState }
>(
  IN_APP_ROUTES.addBookInCart.pathName,
  async ({ bookId, quantity }) => {
    const result = await addCartBook(bookId, quantity);

    return result.data
  });

export const getCartBooks = createAsyncThunk<
  {
    books: CartBookType[],
    totalPrice: number
  },
  void,
  { state: RootState }
>(
  IN_APP_ROUTES.addBookInCart.pathName,
  async () => {
    const result = await getBooksFromCart();

    return result.data
  });
