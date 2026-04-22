import type {
  BookCommentNotificationData,
  CommonResponseType
} from "@utils/types";
import { api } from "./api";

export const getCommentBooksNotificationsApi = async () => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] }
  >>('/notifications/book-notifications');

  return {
    booksNotifications: response.data.data.booksNotifications,
  }
}