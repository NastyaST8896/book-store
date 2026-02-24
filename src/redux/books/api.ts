import { api } from '@redux/api.ts';
import { IN_APP_ROUTES } from '@utils/routes.ts';

export const getBooksApi = async (page: number) => {
  const response = await api.get(
    IN_APP_ROUTES.getBooks.path,
    {
      params: {
        page: page,
      //   pageSize: 20
      }
    }
  );

  return response.data;
};