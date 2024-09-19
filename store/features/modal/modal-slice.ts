import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxModalType = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(
      state: WritableDraft<ReduxModalType>,
      action: PayloadAction<Pick<ReduxModalType, 'isOpen'>>
    ) {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
