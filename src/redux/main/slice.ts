import { createSlice } from "@reduxjs/toolkit";
import type { Socket } from "socket.io-client";
import { connectToSocket, disconnectFromSocket } from "./thunk";

type MainState = {
  isLoading: boolean,
  isConnected: boolean,
  socket: Socket | null,
}

const initialState: MainState = {
  isLoading: false,
  isConnected: false,
  socket: null,
}

export const socketSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(connectToSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectToSocket.fulfilled, (state) => {
        state.isLoading = false;
        state.isConnected = true;
      })
      .addCase(connectToSocket.rejected, (state) => {
        state.isLoading = false;
      })

      //socket disconnect

      .addCase(disconnectFromSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disconnectFromSocket.fulfilled, (state) => {
        state.isLoading = false;
        state.isConnected = false;
      })
      .addCase(disconnectFromSocket.rejected, (state) => {
        state.isLoading = false;
      })
  },
})

export const mainReducer = socketSlice.reducer;