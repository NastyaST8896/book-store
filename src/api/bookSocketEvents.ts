import type { BookCommentNotificationData } from "@utils/types";
import { SocketManager } from "../socket";

const SOCKET_EVENTS = {
  // MESSAGES_NEW_MESSAGE='MESSAGES:INCOMING_NEW',
  NEW_COMMENT: 'new comment',
  NEW_BOOK_COMMENT: 'book comment notification',
  NEW_COMMENT_TOAST: 'new comment toast',
}

export const handleBookNewNotification = (cb: (data: BookCommentNotificationData) => void) => {
  const socket = SocketManager.getSocket();
  if (!socket) {
    return;
  }

  const listener = (data: BookCommentNotificationData) => {
    cb(data);
  };

  socket.on(SOCKET_EVENTS.NEW_BOOK_COMMENT, listener);

  return () => {
    socket.off(SOCKET_EVENTS.NEW_BOOK_COMMENT, listener);
  }
};

export const handleNewCommentToast = (cb: (data: { title: string, id: number }) => void) => {
  const socket = SocketManager.getSocket();
  if (!socket) {
    return;
  }

  const listener = (data: { title: string, id: number }) => {
    cb(data);
  };

  socket.on(SOCKET_EVENTS.NEW_COMMENT_TOAST, listener);

  return () => {
    socket.off(SOCKET_EVENTS.NEW_COMMENT_TOAST, listener);
  }
}

export const handleNewComment = (cb: () => void) => {
  const socket = SocketManager.getSocket();
  if (!socket) {
    return;
  }

  const listener = () => cb();

  socket.on(SOCKET_EVENTS.NEW_COMMENT, listener);

  return () => {
    socket.off(SOCKET_EVENTS.NEW_COMMENT, listener);
  }
}