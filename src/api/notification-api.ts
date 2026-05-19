import type {
  BookCommentNotificationData,
  BooksApiParams,
  CommonResponseType,
  paginationBooksNotificationsType,
} from "@utils/types";
import { api } from "./api";
import { IN_APP_ROUTES } from "@utils/routes";

export const getCommentBooksNotificationsApi = async (params: BooksApiParams) => {
  const response = await api.get<CommonResponseType<
    { booksNotifications: BookCommentNotificationData[] },
    { pagination: paginationBooksNotificationsType }
  >>(IN_APP_ROUTES.getBookNotifications.path,
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
  >>(IN_APP_ROUTES.getBookNotification.path,
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
    IN_APP_ROUTES.setNotificationIsRead.path,
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
  >>(IN_APP_ROUTES.getNotViewedNotification.path,
    {
      params:
      {
        notificationId: params.notificationId,
      }
    }
  );

  return response.data;
}