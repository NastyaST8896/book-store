import axios from 'axios';
import { IN_APP_ROUTES } from '@utils/routes';

// import { refreshTokenUser } from './thunks/auth-thunk.ts';
import { refreshTokenUser } from './auth/api';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// export const getApiClient = (dispatch?: ThunkDispatch<RootState, unknown, UnknownAction>) => {
api.interceptors.request.use(
  (config) => {
    console.log(1);
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
    console.log(response)
    return response
  },
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      return error
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      window.location.href = IN_APP_ROUTES.login.path;
      return error
    }

    originalRequest._retry = true;

    try {

      if (refreshToken) {
        const data = await refreshTokenUser(refreshToken)

        const { accessToken } = data;

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      }
      
    } catch {

    }




      // try {
      /* 1) проверяем наличие refreshToken-а
      2) если есть - запрпшиваем новый access
      3) сохраняем его в локальный стораж
      4) повторяем изначальный запрос, но уже с новым аксес токеном
      5) ну как-то так
      2.1) разлогинить пользователя

      */


      // if (dispatch) {
      //   await dispatch(refreshTokenUser());

      //   const token = localStorage.getItem('accessToken');

      //   originalRequest.headers['Authorization'] = `Bearer ${token}`;

      //   return api(originalRequest);
      //  } catch (err) {
      // store.dispatch(logout());

      //    return Promise.reject(err);
      //   }

      // return Promise.reject(error);
  }
);

//   return api;
// };