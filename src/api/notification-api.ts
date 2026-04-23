import type {
  BookCommentNotificationData,
  BooksApiParams,
  CommonResponseType,
  PaginationType
} from "@utils/types";
import { api } from "./api";

export const getCommentBooksNotificationsApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] },
    { pagination: PaginationType }
  >>('/notifications/book-notifications',
    {
      params:
      {
        page: params.page,
      }
    }
  );

  return response.data;
}