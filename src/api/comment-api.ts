import { IN_APP_ROUTES } from '@utils/routes';
import type { CommentType, CommonResponseType } from '@utils/types';

import { api } from './api';

export const addBookCommentApi = async (bookId: number, text: string) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.addBookComment.path,
    { bookId, text }
  );

  return response.status
};

export const getBookCommentsApi = async (bookId: number) => {
  const response = await api.get<CommonResponseType<
  { comments: CommentType[] }
  >>(`/comments/${bookId}`);

  return {
    comments: response.data.data.comments,
  }
}