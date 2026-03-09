import { IN_APP_ROUTES } from '@utils/routes.ts';
import type {
  Book,
  BooksApiParams,
  CommonResponseType,
  PaginationType
} from '@utils/types';

import { api } from './api';


export const getBooksApi = async (params: BooksApiParams) => {
  const response = await api.get<
    CommonResponseType<{ books: Book[] }, { pagination: PaginationType }>>(
    IN_APP_ROUTES.getBooks.path,
    {
      params:
        {
          page: params.page,
          genres: params.genres,
          maxPrice: params.maxPrice,
          minPrice: params.minPrice,
          sortBy: params.sortBy,
        }
    }
  );

  return response.data;
};
