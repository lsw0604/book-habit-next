import type { Modal } from './types';
import type { RootState } from '@/shared/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Modal = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState(state, action: PayloadAction<Modal>) {
      Object.assign(state, action.payload);
    },
    closeModal(state) {
      Object.assign(state, initialState);
    },
  },
});

export const modalSelector = (state: RootState) => state.modal;

export const { setModalState, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
