type RootModalType = {
  isOpen: boolean;
  type?: ModalComponentType;
};

type ModalComponentType =
  | 'isLogin'
  | 'registerSearchBook'
  | 'modifyComment'
  | 'registerComment'
  | 'deleteComment'
  | 'registerHistory'
  | 'deleteHistory'
  | 'deleteMyBook'
  | 'deleteReply'
  | 'modifyProfile';
