import { createAsyncThunk } from "@reduxjs/toolkit";
import { SocketManager } from "../../socket";

export const connectToSocket = createAsyncThunk(
  'connectToSocket',
  async function (userId: number) { SocketManager.initSocket(userId) }
);

export const disconnectFromSocket = createAsyncThunk(
  'disconnectToSocket',
  async function () { SocketManager.disconnectSocket() }
);