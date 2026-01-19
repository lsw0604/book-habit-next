import { Modal } from './modal.model';

export const modalSelector = <T extends { modal: Modal }>(state: T) =>
  state.modal;
