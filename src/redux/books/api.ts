import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';

export const getBooksApi = async (page: number, genres?: string[]) => {
  const params = new URLSearchParams();

  params.append('page', String(page));

  if (genres) {
    params.append('genres', genres.join(','));
  }

  const response = await api.get(
    IN_APP_ROUTES.getBooks.path,
    { params }
  );

  return response.data;
};