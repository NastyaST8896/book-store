import type { CommonResponseType } from "@utils/types";
import { api } from "./api";
import { IN_APP_ROUTES } from "@utils/routes";
import type { CartBookType } from "@redux/cart-books/slice";

export const addCartBook = async (bookId: number) => {
  const response = await api.post<CommonResponseType<{ cartBooks: CartBookType[],  totalPrice: number }>>(
    IN_APP_ROUTES.addBookInCart.path,
    bookId
  );

  return response.data;
};