import type { BookSummary } from '@/entities/book';
import type { SerializedMyBookHistory } from '@/entities/my-book-history';
import type { SerializedMyBookReview } from '@/entities/my-book-review';

export interface ViewSearchedBookProps {
  bookSummary: BookSummary;
}

export interface ViewMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface ViewMyBookReviewProps {
  selectedReview: SerializedMyBookReview;
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

export interface UpdateMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface UpdateMyBookReviewProps {
  myBookId: number;
}

export interface DeleteMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface DeleteMyBookReviewProps {
  selectedReview: SerializedMyBookReview;
}

export interface DeleteMyBookProps {
  myBookId: number;
}

export type ModalProps =
  | ViewSearchedBookProps
  | ViewMyBookHistoryProps
  | ViewMyBookReviewProps
  | AddMyBookHistoryProps
  | AddMyBookReviewProps
  | UpdateMyBookHistoryProps
  | UpdateMyBookReviewProps
  | DeleteMyBookProps
  | DeleteMyBookReviewProps
  | DeleteMyBookHistoryProps;

export type ModalPropsMap = {
  ADD_MY_BOOK_WITH_REVIEW: AddMyBookWithReviewProps;
  ADD_MY_BOOK_HISTORY: AddMyBookHistoryProps;
  ADD_MY_BOOK_REVIEW: AddMyBookReviewProps;
  VIEW_SEARCHED_BOOK: ViewSearchedBookProps;
  VIEW_MY_BOOK_HISTORY: ViewMyBookHistoryProps;
  VIEW_MY_BOOK_REVIEW: ViewMyBookReviewProps;
  UPDATE_MY_BOOK_HISTORY: UpdateMyBookHistoryProps;
  UPDATE_MY_BOOK_REVIEW: UpdateMyBookReviewProps;
  DELETE_MY_BOOK: DeleteMyBookProps;
  DELETE_MY_BOOK_HISTORY: DeleteMyBookHistoryProps;
  DELETE_MY_BOOK_REVIEW: DeleteMyBookReviewProps;
};

export type ModalType = keyof ModalPropsMap;

export type CloseModalState = { isOpen: false; type: null; props: undefined };

export type OpenModalState =
  | { isOpen: true; type: 'ADD_MY_BOOK_WITH_REVIEW'; props: AddMyBookWithReviewProps }
  | { isOpen: true; type: 'ADD_MY_BOOK_HISTORY'; props: AddMyBookHistoryProps }
  | { isOpen: true; type: 'ADD_MY_BOOK_REVIEW'; props: AddMyBookReviewProps }
  | { isOpen: true; type: 'VIEW_SEARCHED_BOOK'; props: ViewSearchedBookProps }
  | {
    isOpen: true;
    type: 'VIEW_MY_BOOK_HISTORY';
    props: ViewMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'VIEW_MY_BOOK_REVIEW';
    props: ViewMyBookReviewProps;
  }
  | {
    isOpen: true;
    type: 'UPDATE_MY_BOOK_HISTORY';
    props: UpdateMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'UPDATE_MY_BOOK_REVIEW';
    props: UpdateMyBookReviewProps;
  }
  | {
    isOpen: true;
    type: 'DELETE_MY_BOOK_HISTORY';
    props: DeleteMyBookHistoryProps;
  }
  | {
    isOpen: true;
    type: 'DELETE_MY_BOOK';
    props: DeleteMyBookProps;
  }
  | {
    isOpen: true;
    type: 'DELETE_MY_BOOK_REVIEW';
    props: DeleteMyBookReviewProps;
  }

export type Modal = CloseModalState | OpenModalState;
