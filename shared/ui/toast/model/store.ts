import type { Toast } from './types';
import type { RootState } from '@/shared/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  toasts: {
    top: Toast[];
    bottom: Toast[];
  };
}

const initialState: ToastState = {
  toasts: {
    top: [],
    bottom: [],
  },
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast(state, action: PayloadAction<Toast>) {
      if (action.payload.position === 'BOTTOM') {
        state.toasts.bottom.push(action.payload);
      } else {
        state.toasts.top.push(action.payload);
      }
    },
    deleteToast(state, action: PayloadAction<Pick<Toast, 'id'>>) {
      const topIndex = state.toasts.top.findIndex(
        toast => action.payload.id === toast.id
      );
      const bottomIndex = state.toasts.bottom.findIndex(
        toast => action.payload.id === toast.id
      );

      if (topIndex !== -1) {
        state.toasts.top.splice(topIndex, 1);
      }

      if (bottomIndex !== -1) {
        state.toasts.bottom.splice(bottomIndex);
      }
    },
  },
});

export const toastSelector = (state: RootState) => state.toast;

export const { createToast, deleteToast } = toastSlice.actions;

export default toastSlice.reducer;
