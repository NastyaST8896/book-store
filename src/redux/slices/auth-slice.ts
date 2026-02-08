import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerUser } from '../thunks/auth-thunk.ts';

type AuthState = {
  loading: boolean;
  accessToken: string | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  loading: false,
  accessToken: null,
  isAuth: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(registerUser.fulfilled, (state,) => {
        state.loading = false;
        // state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

// export const { } = authSlice.actions;

export const authReducer = authSlice.reducer;