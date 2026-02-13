import { createSlice } from '@reduxjs/toolkit';

import { 
  changeUserName, 
  changeUserPassword, 
  checkAuthUser, loginUser, 
  refreshTokenUser, 
  registerUser 
} from '../thunks/auth-thunk.ts';

type AuthState = {
  isAuth: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  user: { fullName: string; email: string; } | null;
};

const initialState: AuthState = {
  // isAuth: false,
  isAuthChecked: false,
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
        state.user.email = action.payload.user.email;
        state.user.fullName = action.payload.user.fullName || '';

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
        state.isAuthChecked = true;
        state.user = {
          fullName: action.payload.fullName || '',
          email: action.payload.email
        };
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })

      // refreshTokenUser
      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshTokenUser.rejected, () => {
      })

      // changeUserName
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user.fullName = action.payload.fullName;
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
      });
  }
});

// export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;