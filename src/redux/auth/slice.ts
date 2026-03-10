import { createSlice } from '@reduxjs/toolkit';
import type { Nullable, UserType } from '@utils/types.ts';

import {
  changeUserAvatar,
  changeUserName,
  changeUserPassword,
  checkAuthUser,
  getUserInfo,
  loginUser,
  registerUser,
  // registerUser
} from './thunk';

type AuthState = {
  isLoading: boolean;
  user: Nullable<Omit<UserType, 'password'>>;
  avatar: string | null;
};

const initialState: AuthState = {
  isLoading: false,
  user: null,
  avatar: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.user.email,
          fullName: action.payload.user.fullName || '',
          id: action.payload.user.id || ''
        };

        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })

      // checkAuthUser
      .addCase(checkAuthUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.user?.fullName || !state.user?.email) {
          state.user = {
            fullName: action.payload?.user.fullName || '',
            email: action.payload?.user.email || '',
            id: action.payload.user.id || '',
          };
        }
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.isLoading = false;
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
        state.isLoading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: state.user?.id || '',
          email: state.user?.email || '',
          fullName: action.payload.user.fullName,
        };
      })
      .addCase(changeUserName.rejected, (state) => {
        state.isLoading = false;
      })

      // changeUserPassword
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.isLoading = false;
      })

      // changeUserAvatar
      .addCase(changeUserAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload;
      })
      .addCase(changeUserAvatar.rejected, (state) => {
        state.isLoading = false;
      })

      // getUserInfo
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: state.user?.id || '',
          email: action.payload.user.email,
          fullName: action.payload.user.fullName,
        };
        state.avatar = action.payload.user.avatar;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;