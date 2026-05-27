import { IN_APP_ROUTES } from '@utils/routes';
import type { BooksApiParams, CommentType, CommonResponseType, PaginationType } from '@utils/types';

import { api } from './api';

export const addBookCommentApi = async (bookId: number, text: string) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.addBookComment.path,
    { bookId, text }
  );

  return response.data
};

export const getBookCommentsApi = async (
  bookId: number,
  params: BooksApiParams
) => {
  const response = await api.get<CommonResponseType<
    { comments: CommentType[] },
    { pagination: PaginationType }
  >>(`/comments/${bookId}`,
    {
      params:
      {
        page: params.page,
      }
    }
  );

  return response.data;
}