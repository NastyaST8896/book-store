import { IN_APP_ROUTES } from '@utils/routes';
import type {
  CommonResponseType,
  UserCheck,
  UserDataPayload,
  UserNamePayload,
  UserPasswordPayload,
  UserRegister,
  UserWidthAvatar} from '@utils/types';

import type { LoginUserResponseType } from '../redux/user/thunk';

import { api } from './api';

export const register = async (userData: UserDataPayload) => {
  const response = await api.post<CommonResponseType<{ user: UserRegister }>>(
    IN_APP_ROUTES.register.path,
    userData
  );

  return response.data;
};

export const login = async (userData: UserDataPayload) => {
  const response = await api.post<CommonResponseType<LoginUserResponseType>>(
    IN_APP_ROUTES.login.path,
    userData
  );

  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get<CommonResponseType<{ user: UserCheck }>>(
    IN_APP_ROUTES.checkAuth.path
  );

  return response.data;
};

export const getInfo = async () => {
  const response = await api.get<CommonResponseType<{ user: UserWidthAvatar }>>(
    IN_APP_ROUTES.getInfo.path
  );

  return response.data;
};

export const changeName = async (userData: UserNamePayload) => {
  const response = await api.post<CommonResponseType<{ user: UserCheck }>>(
    IN_APP_ROUTES.changeName.path,
    userData
  );

  return response.data;
};

export const changePassword = async (userData: UserPasswordPayload) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.changePassword.path, 
    userData
  );

  return response.data.data.status;
};

// export const refreshTokenUser = async (refreshToken: string) => {
//   const response = await api.post<{
//     accessToken: string;
//     refreshToken: string
//   }>(IN_APP_ROUTES.refreshToken.path, refreshToken);

//   return response.data;
// };

export const changeAvatar = async (formData: FormData) => {
  const response = await api.post<CommonResponseType<{ avatar: string }>>(
    IN_APP_ROUTES.changeAvatar.path, 
    formData
  );

  return response.data;
};



