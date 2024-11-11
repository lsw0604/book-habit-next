type ReduxModalType = {
  isOpen: boolean;
  type?: ModalType;
};

type ModalType =
  | 'register-tag'
  | 'register-my-book'
  | 'register-my-book-comment'
  | 'register-my-book-history'
  | 'delete-my-book'
  | 'delete-my-book-comment';
