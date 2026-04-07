import { IN_APP_ROUTES } from '@utils/routes';
import type { CommonResponseType } from '@utils/types';

import { api } from './api';

export const addBookCommentApi = async (bookId: number, text: string) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.addBookComment.path,
    { bookId, text }
  );

  return response.status
};