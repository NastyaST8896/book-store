import { configureStore } from '@reduxjs/toolkit';

import { userReducer as userReducer } from './user/slice';
import { booksReducer } from './books/slice';
import { cartBooksReducer } from './cart-books/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
    cartBooks: cartBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;