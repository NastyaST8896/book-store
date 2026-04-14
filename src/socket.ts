import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (userId: number) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io('http://localhost:3000/', {
    query: {
      userId
    }
  });

  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if(socket) {
    socket.disconnect();
    socket = null;
  }
}