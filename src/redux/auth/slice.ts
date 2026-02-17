import { createSlice } from '@reduxjs/toolkit';
import type { Nullable, UserType } from '@utils/types.ts';

import {
  changeUserAvatar,
  changeUserName,
  changeUserPassword,
  checkAuthUser,
  loginUser,
  registerUser
} from './thunk';

type AuthState = {
  loading: boolean;
  user: Nullable<Omit<UserType, 'id' | 'password'>>;
};

const initialState: AuthState = {
  loading: false,
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
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
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
        state.user = {
          email: action.payload.user.email,
          fullName: action.payload.user.fullName || ''
        };

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
        if (!state.user?.fullName || !state.user?.email) {
          state.user = {
            fullName: action.payload?.fullName || '',
            email: action.payload?.email || ''
          };
        }
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      // refreshTokenUser
      // .addCase(refreshTokenUser.fulfilled, (_, action) => {
      //   localStorage.setItem('accessToken', action.payload.accessToken);
      //   localStorage.setItem('refreshToken', action.payload.refreshToken);
      // })
      // .addCase(refreshTokenUser.rejected, () => {
      // })

      // changeUserName
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: state.user?.email || '',
          fullName: action.payload.fullName
        };
      })
      .addCase(changeUserName.rejected, (state) => {
        state.loading = false;
      })

      // changeUserPassword
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.loading = false;
      })

      // changeUserAvatar
      .addCase(changeUserAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserAvatar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserAvatar.rejected, (state) => {
        state.loading = false;
      });
  }
});

// export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;