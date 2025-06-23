import type { Auth } from '../model';
import type { RootState } from '@/shared/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<Auth>) {
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
