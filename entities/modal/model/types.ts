export interface Modal {
  isOpen: boolean;
  type: ModalType | null;
}

export type ModalType = 'REGISTER_MY_BOOK' | 'REGISTER_MY_BOOK_HISTORY';
