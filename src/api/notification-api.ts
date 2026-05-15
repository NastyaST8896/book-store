import type {
  BookCommentNotificationData,
  BooksApiParams,
  CommonResponseType,
  paginationBooksNotificationsType,
} from "@utils/types";
import { api } from "./api";

export const getCommentBooksNotificationsApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] },
    { pagination: paginationBooksNotificationsType }
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

export const getCommentBookNotificationApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { bookNotification: BookCommentNotificationData }
  >>('/notifications/book-notification',
    {
      params:
      {
        commentId: params.commentId,
      }
    }
  );

  return response.data;
}

export const patchNotificationIsReadApi = async (notificationsId: (number)[]) => {
  const response = await api.patch<CommonResponseType<{ status: string }>>(
    '/notifications/viewed',
    {
      notificationsId: notificationsId,
    }
  );

  return response.data;
}

export const getNotViewedBookCommentNotificationsApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] },
    { pagination: paginationBooksNotificationsType }
  >>('/notifications/not-viewed-notifications',
    {
      params:
      {
        notificationId: params.notificationId,
      }
    }
  );

  return response.data;
}