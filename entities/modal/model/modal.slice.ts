import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalType, Modal, ModalPropsMap } from './modal.model';

const initialState: Modal = {
  isOpen: false,
  type: null,
  props: undefined,
};

type OpenModalPayload = {
  [K in ModalType]: { type: K; props: ModalPropsMap[K] };
}[ModalType];

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState as Modal,
  reducers: {
    openModal: (_, action: PayloadAction<OpenModalPayload>) =>
      ({
        isOpen: true,
        type: action.payload.type,
        props: action.payload.props,
      }) as Modal,
    closeModal: _ => ({
      isOpen: false,
      type: null,
      props: undefined,
    }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
