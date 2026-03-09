import type { Book, BookProfile, CommonResponseType } from '@utils/types';

import { api } from './api';

export const getBookApi = async (id: string) => {
  const response = await api.get<CommonResponseType<
    {
      book: BookProfile,
      recommended: Book[]
    }>>(`/books/${id}`);

  return response.data;
};