import { createSlice } from '@reduxjs/toolkit';

import { loginUser, refreshTokenUser, registerUser } from '../thunks/auth-thunk.ts';

type AuthState = {
  loading: boolean;
  accessToken: string | null;
  refreshToken: object | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  loading: false,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialAuth: (state) => {
      const storageRefreshToken = JSON.parse(localStorage.getItem('refreshToken')!);
      const storageAccessToken = JSON.parse(localStorage.getItem('accessToken')!)
      state.refreshToken = storageRefreshToken;
      state.accessToken = storageAccessToken
    }
  },
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
        if(state.refreshToken !== action.payload.refreshToken){
          state.refreshToken = action.payload.refreshToken;
          state.accessToken = action.payload.accessToken;
          localStorage.setItem('refreshToken', JSON.stringify(action.payload.refreshToken));
          localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken));
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
      });
  }
});

export const { initialAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;