import { io, Socket } from 'socket.io-client';

const token = localStorage.getItem('accessToken');

export class SocketManager {
  private static socket: Socket | null = null;

  public static initSocket(userId: number) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('http://localhost:3000/', {
      auth: {
        token
      },
      extraHeaders: {
        authorization: `bearer ${token}`
      }
    });

    return new Promise<void>((resolve, reject) => {
      this.socket?.on('connect', () => {
        console.log('Connected');
        resolve();
      });
      this.socket?.on('connect_error', (error) => reject(error));
    });

  }

  public static getSocket(): Socket | null {
    return this.socket;
  }

  public static disconnectSocket() {
    if (this.socket) {
      return new Promise<void>((resolve) => {
        this.socket?.disconnect();
        this.socket = null;
        resolve();
        console.log('Disconnected');
      })
    }
  }
};