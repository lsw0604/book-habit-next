import type { BookSummary } from '@/entities/book';
import type { SerializedMyBookHistory } from '@/entities/my-book-history';

export interface PreviewBookProps {
  bookSummary: BookSummary;
}

export interface AddMyBookWithReviewProps {
  isbn: string;
}

export interface AddMyBookHistoryProps {
  selectedDate: string;
}

export interface AddMyBookReviewProps {
  myBookId: number;
  isbn?: string;
}

export interface ViewMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface EditMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface UpdateMyBookReviewProps {
  myBookId: number;
}

export interface DeleteMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface DeleteMyBookProps {
  myBookId: number;
}

export type ModalProps =
  | PreviewBookProps
  | AddMyBookHistoryProps
  | AddMyBookReviewProps
  | ViewMyBookHistoryProps
  | EditMyBookHistoryProps
  | DeleteMyBookProps
  | DeleteMyBookHistoryProps;

export type ModalPropsMap = {
  PREVIEW_BOOK: PreviewBookProps;
  ADD_MY_BOOK_WITH_REVIEW: AddMyBookWithReviewProps;
  ADD_MY_BOOK_HISTORY: AddMyBookHistoryProps;
  ADD_MY_BOOK_REVIEW: AddMyBookReviewProps;
  VIEW_MY_BOOK_HISTORY: ViewMyBookHistoryProps;
  EDIT_MY_BOOK_HISTORY: EditMyBookHistoryProps;
  UPDATE_MY_BOOK_REVIEW: UpdateMyBookReviewProps;
  DELETE_MY_BOOK: DeleteMyBookProps;
  DELETE_MY_BOOK_HISTORY: DeleteMyBookHistoryProps;
};

export type ModalType = keyof ModalPropsMap;

export type CloseModalState = { isOpen: false; type: null; props: undefined };

export type OpenModalState =
  | { isOpen: true; type: 'PREVIEW_BOOK'; props: PreviewBookProps }
  | { isOpen: true; type: 'ADD_MY_BOOK_WITH_REVIEW'; props: AddMyBookWithReviewProps }
  | { isOpen: true; type: 'ADD_MY_BOOK_HISTORY'; props: AddMyBookHistoryProps }
  | { isOpen: true; type: 'ADD_MY_BOOK_REVIEW'; props: AddMyBookReviewProps }
  | {
    isOpen: true;
    type: 'VIEW_MY_BOOK_HISTORY';
    props: ViewMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'EDIT_MY_BOOK_HISTORY';
    props: EditMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'DELETE_MY_BOOK_HISTORY';
    props: DeleteMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'UPDATE_MY_BOOK_REVIEW';
    props: UpdateMyBookReviewProps;
  }

export type Modal = CloseModalState | OpenModalState;
