import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxToastType = [];

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(
      state: WritableDraft<ReduxToastType>,
      action: PayloadAction<ToastType>
    ) {
      state.push(action.payload);
    },
    removeToast(
      state: WritableDraft<ReduxToastType>,
      action: PayloadAction<Pick<ToastType, 'id'>>
    ) {
      state.filter(
        (toast: WritableDraft<ToastType>) => action.payload.id !== toast.id
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
