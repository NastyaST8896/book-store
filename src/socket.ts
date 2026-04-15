import { io, Socket } from 'socket.io-client';

const token = localStorage.getItem('accessToken');

export class SocketManager {
  private static socket: Socket | null = null;

  public static initSocket(userId: number): Socket {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('http://localhost:3000/', {
      query: {
        userId,
      },
      extraHeaders: {
        authorization: `bearer ${token}`
      }
    });

    return this.socket;
  }

  public static getSocket(): Socket | null {
    return this.socket;
  }

  public static disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
};