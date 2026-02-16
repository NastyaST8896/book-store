import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { UserType } from '@utils/types';
// import axios from 'axios';
import type { Nullable, UserDataPayload } from '@utils/types';

import type { RootState } from '../store.ts';

import {
  changeName,
  changePassword,
  checkAuth,
  login,
  register} from './api.ts';

type LoginUserResponseType = {
  accessToken: string;
  refreshToken: string;
  user: Pick<UserType, 'email'> & { fullName: Nullable<string> };
};

export const registerUser = createAsyncThunk<
  void, UserDataPayload
>(
  IN_APP_ROUTES.register.pathName,
  async (userData, { rejectWithValue }) => {
    try {
      // const api = getApiClient();

      return await register(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk<
  LoginUserResponseType,
  UserDataPayload
>(
  IN_APP_ROUTES.login.pathName,
  async (userData, { rejectWithValue }) => {
    try {
      // const api = getApiClient();

      return login(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkAuthUser = createAsyncThunk<
  { fullName: string; email: string }, void, { state: RootState }
>(
  IN_APP_ROUTES.checkAuth.pathName,
  async (_, { rejectWithValue }) => {
    try {
      // const api = getApiClient(dispatch);
      return checkAuth();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// export const refreshTokenUser = createAsyncThunk<
//   { accessToken: string; refreshToken: string }, void, { state: RootState }
// >(
//   'auth/refreshTokenUser',
//   async ( ) => {
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (!refreshToken) {
//       return rejectWithValue({});
//     }

    

//     // const api = getApiClient(dispatch);

//     const response = await api.post('/auth/refresh', { refreshToken });

//     // const me = await getUser();

//     return response.data;
//   },
// );

// type AuthResponseType = {
//   user: any,
// };

// type UserRequestParams = {
//   name: string;
// };

// const getUser = (params: UserRequestParams) => {
//   return axios.get<AuthResponseType>('/auth/get-me');
// };

export const changeUserName = createAsyncThunk<
  { fullName: string },
  { fullName: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changeName.pathName,
  async (userData) => {
    // const api = getApiClient();

    return await changeName(userData);
  },
);

export const changeUserPassword = createAsyncThunk<
  { status: string },
  { oldPassword: string, newPassword: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changePassword.pathName,
  async (userData) => {
    // const api = getApiClient();

    return changePassword(userData);
  },
);