import { IN_APP_ROUTES } from '@utils/routes';
import { api } from '../api'
import type { UserDataPayload, UserNamePayload, UserPasswordPayload } from '@utils/types';

export const register = async (userData: UserDataPayload) => {
  const response = await api.post(IN_APP_ROUTES.register.path, userData);

  return response.data;
}

export const login = async (userData: UserDataPayload) => {
  const response = await api.post(IN_APP_ROUTES.login.path, userData);

  return response.data;
}

export const checkAuth = async () => {
  const response = await api.get(IN_APP_ROUTES.checkAuth.path);

  return response.data;
}

export const changeName = async (userData: UserNamePayload) => {
  const response = await api.post(IN_APP_ROUTES.changeName.path, userData);

  return response.data;
}

export const changePassword = async (userData: UserPasswordPayload) => {
  const response = await api.post(IN_APP_ROUTES.changeName.path, userData);

  return response.data;
}

export const refreshTokenUser = async (refreshToken:string) => {
  const response = await api.post<{ 
    accessToken: string; 
    refreshToken: string 
  }>(IN_APP_ROUTES.refreshToken.path, refreshToken);

  return response.data;
}



