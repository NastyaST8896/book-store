import { createSlice } from '@reduxjs/toolkit';

import { checkAuthUser, loginUser, refreshTokenUser, registerUser } from '../thunks/auth-thunk.ts';

type AuthState = {
  loading: boolean;
  isAuth: boolean;
  user: { fullName: string; email: string; } | null;
};

const initialState: AuthState = {
  loading: false,
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // state.users.push(action.payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      // checkAuthUser
      .addCase(checkAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.loading = false;
      })

      // refreshTokenUser
      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshTokenUser.rejected, (state, action) => {
      });
  }
});

// export const { } = authSlice.actions;

export const authReducer = authSlice.reducer;