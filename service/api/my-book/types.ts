import { MyBookTag } from '../my-book-tag/types';

export type MyBookStatus = 'TO_READ' | 'START_READ' | 'READING' | 'READ';
export type MyBookOrder = 'desc' | 'asc';

export interface MyBookService {
  postMyBook: (payload: RequestPostMyBook) => Promise<ResponsePostMyBook>;
  getMyBooks: (payload: RequestGetMyBooks) => Promise<ResponseGetMyBooks>;
  getMyBook: (payload: RequestGetMyBook) => Promise<ResponseGetMyBook>;
  putMyBook: (payload: RequestPutMyBook) => Promise<ResponsePutMyBook>;
  deleteMyBook: (payload: RequestDeleteMyBook) => Promise<ResponseDeleteMyBook>;
}

export interface MyBookTranslator {
  id: number;
  name: string;
}

export interface MyBookAuthor {
  id: number;
  name: string;
}

// CREATE MyBook에 대한 Type
export interface ResponsePostMyBook {
  id: number;
  userId: number;
  bookId: number;
  myBookStatus: MyBookStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RequestPostMyBook {
  title: string; //	도서 제목
  contents: string; //	도서 소개
  url: string; //	도서 상세 URL
  isbn: string[]; //	ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호(International Standard Book Number)
  datetime: string; //	도서 출판날짜, ISO 8601 형식
  authors: string[]; //	도서 저자 리스트
  publisher: string; //	도서 출판사
  translators: string[]; //  도서 번역자 리스트
  price: number; //	도서 정가
  sale_price: number; //	도서 판매가
  thumbnail?: string; //	도서 표지 미리보기 URL
  status?: string; //  도서 판매 상태 정보 (정상, 품절, 절판 등)
}

// READ MyBookList에 대한 Type
export interface RequestGetMyBooks {
  status?: MyBookStatus | 'ALL';
  page?: number;
  order?: MyBookOrder;
}

export interface MyBooksItem {
  id: number;
  title: string;
  thumbnail?: string;
  status: MyBookStatus;
  rating: 0;
}

export interface ResponseGetMyBooks {
  nextPage?: number;
  books: MyBooksItem[];
}

// READ MyBookDetail에 대한 Type
export interface RequestGetMyBook {
  myBookId: number;
}

export interface MyBookItem {
  authors: string[];
  contents: string;
  datetime: string;
  publisher: string;
  thumbnail: string;
  title: string;
  url: string;
}

export interface ResponseGetMyBook {
  id: number;
  book: MyBookItem;
  rating: number;
  status: MyBookStatus;
  tag: MyBookTag[];
  createdAt: string;
  updatedAt: string;
}

// UPDATE MyBook에 대한 Type
export interface RequestPutMyBook {
  status?: MyBookStatus;
  rating?: number;
  myBookId: number;
}

export interface ResponsePutMyBook {
  id: number;
  book: MyBookItem;
  rating: number;
  status: MyBookStatus;
  tag: MyBookTag[];
  createdAt: string;
  updatedAt: string;
}

// DELETE MyBook에 대한 Type
export interface RequestDeleteMyBook {
  myBookId: number;
}

export interface ResponseDeleteMyBook {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  myBookStatus: MyBookStatus;
  createdAt: string;
  updatedAt: string;
}
