import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Modal,
  AddMyBookProps,
  AddMyBookHistoryProps,
  EditMyBookHistoryProps,
  ViewMyBookHistoryProps,
  DeleteMyBookHistoryProps,
} from '../types';

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
    openAddMyBookModal: (state, action: PayloadAction<AddMyBookProps>) => {
      state.isOpen = true;
      state.type = 'ADD_MY_BOOK';
      state.props = action.payload;
    },
    openAddMyBookHistoryModal: (
      state,
      action: PayloadAction<AddMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'ADD_MY_BOOK_HISTORY';
      state.props = action.payload;
    },
    openViewMyBookHistoryModal: (
      state,
      action: PayloadAction<ViewMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'VIEW_MY_BOOK_HISTORY';
      state.props = action.payload;
    },
    openEditMyBookHistory: (
      state,
      action: PayloadAction<EditMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'EDIT_MY_BOOK_HISTORY';
      state.props = action.payload;
    },
    openDeleteMyBookHistory: (
      state,
      action: PayloadAction<DeleteMyBookHistoryProps>
    ) => {
      state.isOpen = true;
      state.type = 'DELETE_MY_BOOK_HISTORY';
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
  closeModal,
  setModalState,
  openAddMyBookModal,
  openEditMyBookHistory,
  openDeleteMyBookHistory,
  openAddMyBookHistoryModal,
  openViewMyBookHistoryModal,
} = modalSlice.actions;

export default modalSlice.reducer;
