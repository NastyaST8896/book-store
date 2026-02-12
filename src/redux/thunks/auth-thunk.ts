import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApiClient } from '../api.ts';
import type { RootState } from '../store.ts';

type UserDataType = {
  email: string;
  password: string;
};

type LoginUserResponseType = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    fullName: string | null;
  };
};

export const registerUser = createAsyncThunk<
  void, UserDataType
>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const api = getApiClient();

      const response = await api.post('/auth/register', userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk<
  LoginUserResponseType,
  UserDataType
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

export const changeUser = createAsyncThunk<
  { fullName: string }, { fullName: string }, { state: RootState }
>(
  'auth/changeUser',
  async (userName) => {
    const api = getApiClient();

    const response = await api.post('/auth/change', userName);

    return response.data;
  },
);
