import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RootModalType = {
  isOpen: false,
  type: undefined,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setModalType(state, action: PayloadAction<ModalComponentType>) {
      state.type = action.payload;
    },
  },
});

export const modalActions = { ...modal.actions };

export default modal;
