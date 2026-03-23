import type { CommonResponseType, Genre } from '@utils/types';

import { api } from './api';

export const getGenresApi = async () => {
  const response = await api.get<
    CommonResponseType<{ allGenres: Genre[] }>>(
    '/books/genres',
  );

  return {
      allGenres: response.data.data.allGenres,
    };
};