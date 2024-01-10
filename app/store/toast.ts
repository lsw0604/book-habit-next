import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootToastType = [];

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setAddToast(state, action: PayloadAction<ToastType>) {
      state.push(action.payload);
    },
    setRemoveToast(state, action: PayloadAction<string>) {
      return state.filter((toast) => action.payload !== toast.id);
    },
  },
});

export const toastActions = { ...toast.actions };

export default toast;
