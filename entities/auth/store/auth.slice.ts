import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/redux/store';

import type { SerializedAuth } from '../model';

const initialState: SerializedAuth = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<SerializedAuth>) {
      Object.assign(state, action.payload);
    },
    clearAuthState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
