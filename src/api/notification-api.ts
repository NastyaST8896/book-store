import type {
  BookCommentNotificationData,
  BooksApiParams,
  CommonResponseType,
} from "@utils/types";
import { api } from "./api";

export const getCommentBooksNotificationsApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] },
    { pagination: {limit: number, totalAmount: number} }
  >>('/notifications/book-notifications',
    {
      params:
      {
        notificationId: params.notificationId,
      }
    }
  );

  return response.data;
}