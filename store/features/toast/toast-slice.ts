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
      /**
       * * immer가 불변성을 관리하고 있기 때문에 배열을 직접 수정하는것도 괜찮음 그래서 filter 대신 이 방법을 사용함
       */
      const index = state.findIndex(
        (toast: WritableDraft<ToastType>) => action.payload.id === toast.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
