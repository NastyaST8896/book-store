import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { UserType } from '@utils/types';
import type { Nullable, UserDataPayload } from '@utils/types';

import type { RootState } from '../store.ts';

import {
  changeAvatar,
  changeName,
  changePassword,
  checkAuth,
  getAvatar,
  getInfo,
  login,
  register
} from './api.ts';

type LoginUserResponseType = {
  accessToken: string;
  refreshToken: string;
  user: Pick<UserType, 'email'> & {
    fullName: Nullable<string>,
    avatar: Nullable<string>
  };
};

export const registerUser = createAsyncThunk<
  void, UserDataPayload
>(
  IN_APP_ROUTES.register.pathName,
  async (userData) => await register(userData)
);


export const loginUser = createAsyncThunk<
  LoginUserResponseType,
  UserDataPayload
>(
  IN_APP_ROUTES.login.pathName,
  async (userData) => login(userData)
);


export const checkAuthUser = createAsyncThunk<
  { fullName: string; email: string }, void, { state: RootState }
>(
  IN_APP_ROUTES.checkAuth.pathName,
  async (_) => checkAuth()
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

export const getUserInfo = createAsyncThunk<
  { fullName: string, email: string, avatar: string },
  void,
  { state: RootState }
>(
  IN_APP_ROUTES.getInfo.pathName,
  async (_) => await getInfo()
);

export const changeUserName = createAsyncThunk<
  { fullName: string },
  { fullName: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changeName.pathName,
  async (userData) => await changeName(userData)
);


export const changeUserPassword = createAsyncThunk<
  { status: string },
  { oldPassword: string, newPassword: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changePassword.pathName,
  async (userData) => changePassword(userData)
);


export const changeUserAvatar = createAsyncThunk<
  { avatar: string },
  { file: File },
  { state: RootState }
>(
  IN_APP_ROUTES.changeAvatar.pathName,
  async ({ file }) => {

    if (!file) return;


    const formData = new FormData();

    formData.append('file', file);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    return changeAvatar(formData);
  }
);

export const getUserAvatar = createAsyncThunk<
  void,
  { avatar: File },
  { state: RootState }
>(
  IN_APP_ROUTES.getAvatar.pathName,
  async (_) => getAvatar()
);