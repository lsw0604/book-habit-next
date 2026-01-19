import { type ModalType, MODAL_TITLE_CONSTANT } from '../model';

export const getModalTitle = (type: ModalType | null) => {
  if (!type) return '알 수 없음';

  return MODAL_TITLE_CONSTANT[type];
};
