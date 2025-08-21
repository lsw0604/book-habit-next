import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  Modal,
  RegisterMyBookHistoryProps,
  RegisterMyBookProps,
  SelectedMyBookHistoryProps,
} from './types';

const initialState: Modal = {
  isOpen: false,
  type: null,
  props: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<Modal>) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.props = action.payload.props;
    },
    openAddMyBookModal: (state, action: PayloadAction<RegisterMyBookProps>) => {
      state.isOpen = true;
      state.type = 'REGISTER_MY_BOOK';
      state.props = action.payload;
    },
    openAddMyBookHistoryModal: (
      state,
      action: PayloadAction<RegisterMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'REGISTER_MY_BOOK_HISTORY';
      state.props = action.payload;
    },
    openSelectedMyBookHistoryModal: (
      state,
      action: PayloadAction<SelectedMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'SELECTED_MY_BOOK_HISTORY';
      state.props = action.payload;
    },
    closeModal: state => {
      state.isOpen = false;
      state.type = null;
      state.props = undefined;
    },
  },
});

export const {
  setModalState,
  openAddMyBookModal,
  openAddMyBookHistoryModal,
  openSelectedMyBookHistoryModal,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
