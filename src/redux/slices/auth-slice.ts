import { createSlice } from '@reduxjs/toolkit';

import { checkAuthUser, loginUser, refreshTokenUser, registerUser, changeUser } from '../thunks/auth-thunk.ts';

type AuthState = {
  loading: boolean;
  isAuth: boolean;
  user: { fullName: string; email: string; };
};

const initialState: AuthState = {
  loading: false,
  isAuth: false,
  user: { fullName: 'Your Name', email: 'Your Email' },
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
        if(action.payload.fullName) {
          state.user.fullName = action.payload.fullName;
        }
        state.user.email = action.payload.email;
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
      .addCase(refreshTokenUser.rejected, (state) => {
      })

      // changeUser
      .addCase(changeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user.fullName = action.payload.fullName;
      })
      .addCase(changeUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

// export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;