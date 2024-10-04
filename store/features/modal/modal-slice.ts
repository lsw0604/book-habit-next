import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

const initialState: ReduxModalType = {
  isOpen: false,
  type: undefined,
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
    setModalType(
      state: WritableDraft<ReduxModalType>,
      action: PayloadAction<Pick<ReduxModalType, 'type'>>
    ) {
      state.type = action.payload.type;
    },
    setModalState(
      state: WritableDraft<ReduxModalType>,
      action: PayloadAction<ReduxModalType>
    ) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setModal, setModalType, setModalState } = modalSlice.actions;

export default modalSlice.reducer;
