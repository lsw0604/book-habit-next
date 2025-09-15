import { MODAL_TITLE_CONSTANT } from '../constants';
import { ModalType } from '../types';

export const getModalTitle = (type: ModalType | null) => {
  if (!type) return '알 수 없음';

  return MODAL_TITLE_CONSTANT[type];
};
