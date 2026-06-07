import { createAsyncThunk } from '@reduxjs/toolkit';
import { IN_APP_ROUTES } from '@utils/routes';
import type { 
  UserCheck, 
  UserRegister, 
  UserType, 
  UserWithAvatar
} from '@utils/types';
import type { Nullable, UserDataPayload } from '@utils/types';

import {
  changeAvatar,
  changeName,
  changePassword,
  checkAuth,
  getInfo,
  login,
  register
} from '../../api/user-api.ts';
import type { RootState } from '../store.ts';

export type LoginUserResponseType = {
  accessToken: string;
  refreshToken: string;
  user: Pick<UserType, 'email' | 'id'> & {
    fullName: Nullable<string>,
    avatar: Nullable<string>
  };
};

export const registerUser = createAsyncThunk<
  UserRegister, UserDataPayload
>(
  IN_APP_ROUTES.register.pathName,
  async (userData) => {
    const result = await register(userData);

    return result.data.user;
  }
);


export const loginUser = createAsyncThunk<
  {
    accessToken: string,
    refreshToken: string,
    user: Pick<UserType, 'email' | 'id'> & {
      fullName: Nullable<string>,
      avatar: Nullable<string>
    }
  },
  UserDataPayload
>(
  IN_APP_ROUTES.login.pathName,
  async (userData) => {
    const result = await login(userData);
    
    return {
      user: result.data.user,
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken
    };
  }
);


export const checkAuthUser = createAsyncThunk<
  { user: UserCheck }, void, { state: RootState }
>(
  IN_APP_ROUTES.checkAuth.pathName,
  async () => {
    const result = await checkAuth();

    return {
      user: result.data.user
    };
  }
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
  { user: UserWithAvatar },
  void,
  { state: RootState }
>(
  IN_APP_ROUTES.getInfo.pathName,
  async () => {
    const result = await getInfo();

    return {
      user: result.data.user,
    };
  }
);

export const changeUserName = createAsyncThunk<
  { user: UserCheck },
  { fullName: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changeName.pathName,
  async (userData) => {
    const result = await changeName(userData);

    return {
      user: result.data.user
    };
  }
);


export const changeUserPassword = createAsyncThunk<
  string,
  { oldPassword: string, newPassword: string },
  { state: RootState }
>(
  IN_APP_ROUTES.changePassword.pathName,
  async (userData) => {
    const result = await changePassword(userData);

    return result;
  }
);


export const changeUserAvatar = createAsyncThunk<
  string,
  { file: File },
  { state: RootState }
>(
  IN_APP_ROUTES.changeAvatar.pathName,
  async ({ file }) => {

    if (!file) return '';


    const formData = new FormData();

    formData.append('file', file);

    const result = await changeAvatar(formData);

    return result.data.avatar;
  }
);