import type { getBookNotificationsAgrType } from "@utils/types";
import { getCommentBooksNotificationsApi } from "./notification-api";


export const getBookNotifications:
  (arg: getBookNotificationsAgrType) => Promise<void> = async (arg) => {
    const { comments, setComments, setNotViewedCommentCount } = arg;
    let result;

    if (comments.length === 0) {
      result = await getCommentBooksNotificationsApi(
        { notificationId: String(0) }
      );

    } else {
      result = await getCommentBooksNotificationsApi(
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

      setNotViewedCommentCount(pagination.notViewedAmount);
    }

    return;
  }