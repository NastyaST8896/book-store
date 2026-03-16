import type { CommonResponseType } from "@utils/types";
import { api } from "./api";
import { IN_APP_ROUTES } from "@utils/routes";

export const addCartBook = async (bookId: number) => {
  const response = await api.post<CommonResponseType<{ status: string }>>(
    IN_APP_ROUTES.addBookInCart.path,
    bookId
  );

  return response.data;
};