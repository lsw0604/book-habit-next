import { Book } from '@/entities/book/model';
import { SerializedMyBookHistory } from '@/entities/my-book-history/model';

export interface RegisterMyBookProps {
  selectedBook: Book;
}

export interface RegisterMyBookHistoryProps {
  selectedDate: string;
}

export interface SelectedMyBookHistoryProps {
  selectedHistory: SerializedMyBookHistory;
}

export type ModalType =
  | 'REGISTER_MY_BOOK'
  | 'REGISTER_MY_BOOK_HISTORY'
  | 'SELECTED_MY_BOOK_HISTORY';

// Props의 Union 타입
export type ModalProps =
  | RegisterMyBookProps
  | RegisterMyBookHistoryProps
  | SelectedMyBookHistoryProps;

// 타입 안전한 Modal 상태
export interface Modal {
  isOpen: boolean;
  type: ModalType | null;
  props?: ModalProps;
}
