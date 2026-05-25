import { createAsyncThunk } from "@reduxjs/toolkit";
import { SocketManager } from "../../socket";

export const connectToSocket = createAsyncThunk(
  'connectToSocket',
  async function () { SocketManager.initSocket() }
);

export const disconnectFromSocket = createAsyncThunk(
  'disconnectToSocket',
  async function () { SocketManager.disconnectSocket() }
);