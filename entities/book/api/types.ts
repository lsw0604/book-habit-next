import type { SearchBook } from '../model';

import type { BookDTO, ResponseSearchDTO } from './book.dto';

export interface BookService {
  search: (payload: BookSearchPayload) => Promise<ResponseSearchDTO>;
  findOrCreate: (payload: FindOrCreatePayload) => Promise<BookDTO>;
  findById: (bookId: number) => Promise<BookDTO>;
}

export interface BookSearchPayload {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
}

export interface FindOrCreatePayload extends SearchBook {}
