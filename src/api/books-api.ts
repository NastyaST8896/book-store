import { api } from './api';
import { IN_APP_ROUTES } from '@utils/routes.ts';
import type {
  Book,
  BooksApiParams,
  CommonResponseType,
  PaginationType
} from '@utils/types';


export const getBooksApi = async (params: BooksApiParams) => {
  const response = await api.get<
    CommonResponseType<{ books: Book[] }, { pagination: PaginationType }>>(
    IN_APP_ROUTES.getBooks.path,
    {
      params:
        {
          page: String(params.page),
          genres: params.genres?.length && params.genres.join(','),
          maxPrice: params.maxPrice,
          minPrice: params.minPrice,
          sortBy: params.sortBy,
        }
    }
  );

  return response.data;
};
