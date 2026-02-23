import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';

export const getBooksApi = async () => {
  const response = await api.get(
    IN_APP_ROUTES.getBooks.path,
    {
      params: {
        page: 1,
        pageSize: 20
      }
    }
  );

  return response.data;
};