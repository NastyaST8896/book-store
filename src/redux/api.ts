import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { refreshTokenUser } from './thunks/auth-thunk.ts';
import type { RootState } from './store.ts';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const getApiClient = (dispatch?: ThunkDispatch<RootState, unknown, UnknownAction>) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (dispatch) {
            await dispatch(refreshTokenUser());

            const token = localStorage.getItem('accessToken');

            originalRequest.headers['Authorization'] = `Bearer ${token}`;

            return api(originalRequest);
          }
        } catch (err) {
          // store.dispatch(logout());

          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};