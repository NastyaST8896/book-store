import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApiClient } from '../api.ts';
import type { RootState } from '../store.ts';

type UserDataType = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk<void, UserDataType, { state: RootState }>(
  'auth/registerUser',
  async (userData, { getState }) => {
    const api = getApiClient(getState);

    const response = await api.post('/auth/register', userData);

    return response.data;
  },
);

export const loginUser = createAsyncThunk<{ accessToken: string }, UserDataType, { state: RootState }>(
  'auth/loginUser',
  async (userData, { getState }) => {
    const api = getApiClient(getState);

    const response = await api.post('/auth/login', userData);

    return response.data;
  },
);
