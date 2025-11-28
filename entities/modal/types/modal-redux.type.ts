import type { KakaoSearchBook } from '@/entities/book';
import type { SerializedMyBookHistory } from '@/entities/my-book-history';

export interface PreviewBookProps {
  kakaoSearchBook: KakaoSearchBook;
}

export interface AddMyBookHistoryProps {
  selectedDate: string;
}

export interface AddMyBookReviewProps {
  myBookId: number;
}

export interface ViewMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface EditMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export interface DeleteMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export type ModalType =
  | 'PREVIEW_BOOK'
  | 'ADD_MY_BOOK_HISTORY'
  | 'ADD_MY_BOOK_REVIEW'
  | 'VIEW_MY_BOOK_HISTORY'
  | 'EDIT_MY_BOOK_HISTORY'
  | 'DELETE_MY_BOOK_HISTORY';

export type ModalProps =
  | PreviewBookProps
  | AddMyBookHistoryProps
  | AddMyBookReviewProps
  | ViewMyBookHistoryProps
  | EditMyBookHistoryProps
  | DeleteMyBookHistoryProps;

export type ModalPropsMap = {
  PREVIEW_BOOK: PreviewBookProps;
  ADD_MY_BOOK_HISTORY: AddMyBookHistoryProps;
  ADD_MY_BOOK_REVIEW: AddMyBookReviewProps;
  VIEW_MY_BOOK_HISTORY: ViewMyBookHistoryProps;
  EDIT_MY_BOOK_HISTORY: EditMyBookHistoryProps;
  DELETE_MY_BOOK_HISTORY: DeleteMyBookHistoryProps;
};

export interface Modal {
  isOpen: boolean;
  type: ModalType | null;
  props?: ModalPropsMap[ModalType];
}
