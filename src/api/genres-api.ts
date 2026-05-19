import type { CommonResponseType, Genre } from '@utils/types';

import { api } from './api';
import { IN_APP_ROUTES } from '@utils/routes';

export const getGenresApi = async () => {
  const response = await api.get<
    CommonResponseType<{ allGenres: Genre[] }>>(
      IN_APP_ROUTES.getBookGenres.path,
    );

  return {
    allGenres: response.data.data.allGenres,
  };
};