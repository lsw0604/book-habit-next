import { PaginationMeta } from '@/shared/pagination/types';
import { MyBookStatus, MyBookOrder } from '../model/types';

export interface MyBookService {
  getMyBook: (myBookId: number) => Promise<MyBookDetail>;
  getMyBooks: (params: GetMyBooksPayload) => Promise<MyBooks>;
  addMyBook: (payload: CreateMyBookPayload) => Promise<MyBook>;
  updateMyBook: (payload: UpdateMyBookPayload) => Promise<MyBookDetail>;
  deleteMyBook: (myBookId: number) => Promise<MyBook>;
}

export interface MyBook {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  status: MyBookStatus;
}

export interface MyBooks {
  books: MyBook[];
  meta: PaginationMeta;
}

export interface MyBookDetail {
  id: number;
  status:
    | MyBookStatus.WANT_TO_READ
    | MyBookStatus.CURRENTLY_READING
    | MyBookStatus.READ;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  book: {
    url: string;
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
    datetime: Date;
    authors: string[];
    translators: string[];
  };
}

export interface GetMyBooksPayload {
  page: number;
  status: MyBookStatus;
  order: MyBookOrder;
}

export interface CreateMyBookPayload {
  title: string;
  publisher?: string;
  price?: number;
  sale_price?: number;
  thumbnail?: string;
  contents?: string;
  url?: string;
  datetime: string;
  status?: string;
  authors: string[];
  isbns: string[];
  translators?: string[];
}

export interface UpdateMyBookPayload {
  myBookId: number;
  rating?: number;
  status?: MyBookStatus;
}
