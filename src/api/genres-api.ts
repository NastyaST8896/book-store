import { api } from "./api";
import type { CommonResponseType, Genre } from "@utils/types";

export const getGenresApi = async () => {
  const response = await api.get<
    CommonResponseType<{ allGenres: Genre[] }>>(
    '/books/genres',
  );

  return response.data;
};