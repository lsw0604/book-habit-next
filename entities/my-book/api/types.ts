import { MyBookDetailDTO, MyBookDTO, MyBooksDTO } from './my-book-.dto';

export interface MyBookService {
  getMyBook: (payload: GetMyBookPayload) => Promise<MyBookDetailDTO>;
  getMyBooks: (params: GetMyBooksPayload) => Promise<MyBooksDTO>;
  addMyBook: (payload: CreateMyBookPayload) => Promise<MyBookDTO>;
  updateMyBook: (payload: UpdateMyBookPayload) => Promise<MyBookDetailDTO>;
  deleteMyBook: (payload: DeleteMyBookPayload) => Promise<{ id: number }>;
}

export interface GetMyBookPayload {
  myBookId: number;
}

export interface GetMyBooksPayload {
  page: number;
  status: string;
  order: string;
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
  status?: string;
}

export interface DeleteMyBookPayload {
  myBookId: number;
}
