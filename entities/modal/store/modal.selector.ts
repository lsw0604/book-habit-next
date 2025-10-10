import { Modal } from '../types';

export const modalSelector = <T extends { modal: Modal }>(state: T) =>
  state.modal;
