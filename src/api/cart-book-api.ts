import type { CartBookType } from '@redux/cart-books/slice';
import { IN_APP_ROUTES } from '@utils/routes';
import type { CommonResponseType } from '@utils/types';

import { api } from './api';

export const addCartBook = async (bookId: number, quantity?: number) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.addBookInCart.path,
    { bookId, quantity }
  );

  return response.data;
};

export const getBooksFromCart = async () => {
  const response = await api.get<CommonResponseType<{
    books: CartBookType[],
    totalPrice: number 
  }>>(
    IN_APP_ROUTES.getCartBooks.path,
  );

  return response.data;
};