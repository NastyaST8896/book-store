import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { booksReducer } from './books/slice';
import { cartBooksReducer } from './cart-books/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    cartBooks: cartBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;