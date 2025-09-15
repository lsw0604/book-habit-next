import { Book } from '@/entities/book';
import { SerializedMyBookHistory } from '@/entities/my-book-history';

export interface AddMyBookProps {
  selectedBook: Book;
}

export interface AddMyBookHistoryProps {
  selectedDate: string;
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
  | 'ADD_MY_BOOK'
  | 'ADD_MY_BOOK_HISTORY'
  | 'VIEW_MY_BOOK_HISTORY'
  | 'EDIT_MY_BOOK_HISTORY'
  | 'DELETE_MY_BOOK_HISTORY';

export type ModalProps =
  | AddMyBookProps
  | AddMyBookHistoryProps
  | ViewMyBookHistoryProps
  | EditMyBookHistoryProps
  | DeleteMyBookHistoryProps;

export type ModalPropsMap = {
  ADD_MY_BOOK: AddMyBookProps;
  ADD_MY_BOOK_HISTORY: AddMyBookHistoryProps;
  VIEW_MY_BOOK_HISTORY: ViewMyBookHistoryProps;
  EDIT_MY_BOOK_HISTORY: EditMyBookHistoryProps;
  DELETE_MY_BOOK_HISTORY: DeleteMyBookHistoryProps;
};

export interface Modal {
  isOpen: boolean;
  type: ModalType | null;
  props?: ModalPropsMap[ModalType];
}
