import type { Book, BookProfile, CommonResponseType } from '@utils/types';

import { api } from './api';

export const getBookApi = async (params: { id: string, userId?: string }) => {

  const response = await api.get<CommonResponseType<
    {
      book: BookProfile,
      recommended: Book[]
    },
    {
      userId: string
    }
  >>(`/books/${params.id}`,
    {
      params:
        {
          userId: params.userId
        }
    }
  );

  return {
    book: response.data.data.book,
    recommended: response.data.data.recommended,
  };
};