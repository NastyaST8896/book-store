import { IN_APP_ROUTES } from '@utils/routes';
import axios from 'axios';

// import { refreshTokenUser } from './auth/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      window.location.href = IN_APP_ROUTES.login.path;

      return error;
    }

    originalRequest._retry = true;

    // if (refreshToken) {
    //   const data = await refreshTokenUser(refreshToken);

    //   const { accessToken } = data;

    //   localStorage.setItem('accessToken', accessToken);

    //   originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

    //   return api(originalRequest);
    // }

    // try {
    /* 1) проверяем наличие refreshToken-а
    2) если есть - запрпшиваем новый access
    3) сохраняем его в локальный стораж
    4) повторяем изначальный запрос, но уже с новым аксес токеном
    5) ну как-то так
    2.1) разлогинить пользователя

    */
  }
);