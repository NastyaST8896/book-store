import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';

export const getBooksApi = async (page: number, genres: string[]) => {
  const response = await api.get(
    IN_APP_ROUTES.getBooks.path,
    {
      params: {
        page: page,
        genres: genres
      }
    }
  );

  return response.data;
};