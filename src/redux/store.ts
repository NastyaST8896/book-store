import { configureStore } from '@reduxjs/toolkit';

import { userReducer as userReducer } from './user/slice';
import { booksReducer } from './books/slice';
import { cartBooksReducer } from './cart-books/slice';
import { mainReducer } from './main/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
    cartBooks: cartBooksReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;