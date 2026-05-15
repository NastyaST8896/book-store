import type { changeNotificationStatusAgrType, getBookNotificationsAgrType } from "@utils/types";
import { patchNotificationIsReadApi } from "./notification-api";


export const getBookNotifications:
  (arg: getBookNotificationsAgrType) => Promise<void> = async (arg) => {
    const { comments, setComments, setNotViewedCommentCount, notificationsApi } = arg;
    let result;

    if (comments.length === 0) {
      result = await notificationsApi(
        { notificationId: String(0) }
      );

    } else {
      result = await notificationsApi(
        { notificationId: String(comments[comments.length - 1].notificationId) }
      );
    }

    const booksNotifications = result.data.booksNotifications;
    const pagination = result.meta?.pagination;

    if (
      booksNotifications.length && pagination &&
      (comments.length < pagination.totalAmount)
    ) {
      (comments.length === 0) && setComments(booksNotifications);

      (comments.length !== 0) &&
        setComments(
          (prevComments) => [...prevComments, ...booksNotifications]
        );

        if(pagination.notViewedAmount){
          setNotViewedCommentCount(pagination?.notViewedAmount);
        }
    }

    return;
  }