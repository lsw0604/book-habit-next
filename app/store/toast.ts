import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootToastType = {
  toast: [],
};

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setAddToast(state, action: PayloadAction<ToastType>) {
      state.toast.push(action.payload);
    },
    setRemoveToast(state, action: PayloadAction<string>) {
      state.toast.filter((toast) => toast.id !== action.payload);
    },
    setBookRegisterInitialState(state, _: PayloadAction) {
      state = initialState;
      return state;
    },
  },
});

export const toastActions = { ...toast.actions };

export default toast;
