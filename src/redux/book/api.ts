import { api } from '@redux/api.ts';

export const getBookApi = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
}