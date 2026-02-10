import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApiClient } from '../api.ts';
import type { RootState } from '../store.ts';

type UserDataType = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk<
  void, UserDataType
>(
  'auth/registerUser',
  async (userData) => {
    const api = getApiClient();

    const response = await api.post('/auth/register', userData);

    return response.data;
  },
);

export const loginUser = createAsyncThunk<
  { accessToken: string; refreshToken: string }, UserDataType
>(
  'auth/loginUser',
  async (userData) => {
    const api = getApiClient();

    const response = await api.post('/auth/login', userData);

    return response.data;
  },
);

export const checkAuthUser = createAsyncThunk<
  { fullName: string; email: string }, void, { state: RootState }
>(
  'auth/checkAuthUser',
  async (_, { dispatch }) => {
    const api = getApiClient(dispatch);

    const response = await api.get('/auth/check-auth');

    return response.data;
  },
);

export const refreshTokenUser = createAsyncThunk<
  { accessToken: string; refreshToken: string }, void, { state: RootState }
>(
  'auth/refreshTokenUser',
  async (_, { dispatch, rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return rejectWithValue({});
    }

    const api = getApiClient(dispatch);

    const response = await api.post('/auth/refresh', { refreshToken });

    return response.data;
  },
);
