import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../api.ts';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string, password: string }) => {
    const response = await api.post('/auth/register', userData);

    return response.data;
  },
);
