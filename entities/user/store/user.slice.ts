import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SerializedUser } from '../model';

export interface UserState {
  user: SerializedUser | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserState(state, action: PayloadAction<SerializedUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUserState(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserState, clearUserState } = authSlice.actions;
export default authSlice.reducer;
