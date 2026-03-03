import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { booksReducer } from './books/slice';
import { bookReducer } from './book/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    book: bookReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;