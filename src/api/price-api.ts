import { api } from "./api";
import type { CommonResponseType } from "@utils/types";

export const getMaxPriceApi = async () => {
  const response = await api.get<
    CommonResponseType<{ maxPrice: number }>>(
    '/books/maxPrice',
  );

  return response.data;
};