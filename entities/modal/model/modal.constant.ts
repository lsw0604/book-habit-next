import { ModalType } from './modal.model';

export const MODAL_TITLE_CONSTANT: Record<ModalType, string> = {
  ADD_MY_BOOK_HISTORY: '독서 기록 등록',
  ADD_MY_BOOK_REVIEW: '독서 한줄평 등록',
  VIEW_SEARCHED_BOOK: '책 미리보기',
  VIEW_MY_BOOK_HISTORY: '독서 기록 상세보기',
  VIEW_MY_BOOK_REVIEW: '독서 한줄평 상세보기',
  UPDATE_MY_BOOK_HISTORY: '독서 기록 수정하기',
  UPDATE_MY_BOOK_REVIEW: '독서 한줄평 수정하기',
  DELETE_MY_BOOK: '내 서재에 삭제하기',
  DELETE_MY_BOOK_HISTORY: '독서 기록 삭제하기',
  DELETE_MY_BOOK_REVIEW: '독서 한줄평 삭제하기',
};
