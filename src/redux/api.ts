import axios from 'axios';

import type { RootState } from './store.ts';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getApiClient = (getState: () => RootState) => {
  const token = getState().auth.accessToken;

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }

  return api;
};