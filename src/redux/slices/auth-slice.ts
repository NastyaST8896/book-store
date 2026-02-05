import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunks/auth-thunk.ts';

type AuthState = {
  loading: boolean;
};

const initialState: AuthState = {
  loading: false,
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
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // state.users.push(action.payload);
      });
  }
});

// export const { } = authSlice.actions;

export const authReducer = authSlice.reducer;