import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';

export const getBooksApi = async (
  page: number,
  genres?: string[],
  maxPrice?: number,
  minPrice?: number,
) => {
  const params = new URLSearchParams();

  params.append('page', String(page));

  if (genres?.length) {
    params.append('genres', genres.join(','));
  }

  if(maxPrice) {
    params.append('maxPrice', String(maxPrice));
  }

  if(minPrice) {
    params.append('minPrice', String(minPrice));
  }
  const response = await api.get(
    IN_APP_ROUTES.getBooks.path,
    { params }
  );

  return response.data;
};