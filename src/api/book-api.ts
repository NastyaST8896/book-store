import { api } from './api';
import type { Book, BookProfile, CommonResponseType } from '@utils/types';

export const getBookApi = async (id: string) => {
  const response = await api.get<CommonResponseType<
  { 
    book: BookProfile, 
    recommended: Book[] 
  }>>(`/books/${id}`);
  return response.data;
}