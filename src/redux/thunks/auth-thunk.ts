import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApiClient } from '../api.ts';
import type { RootState } from '../store.ts';

type UserDataType = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk<
void, UserDataType, { state: RootState }
>(
  'auth/registerUser',
  async (userData, { getState }) => {
    const api = getApiClient(getState);

    const response = await api.post('/auth/register', userData);

    return response.data;
  },
);

export const loginUser = createAsyncThunk<
{ accessToken: string, refreshToken:object }, UserDataType, { state: RootState }
>(
  'auth/loginUser',
  async (userData, { getState }) => {
    const api = getApiClient(getState);

    const response = await api.post('/auth/login', userData);

    return response.data;
  },
);

export const refreshTokenUser = createAsyncThunk<
{ accessToken: string }, string, { state: RootState }
>(
  'auth/refreshTokenUser',
  async (_, { getState }) => {
    const refreshToken = getState().auth.refreshToken
    const api = getApiClient(getState);

    const response = await api.post('/auth/refresh', {refreshToken});

    return response.data;
  },
);
