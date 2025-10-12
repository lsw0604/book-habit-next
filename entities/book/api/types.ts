import type { ResponseSearchDTO } from './book.dto';

export interface BookService {
  search: (payload: BookSearchPayload) => Promise<ResponseSearchDTO>;
}

export interface BookSearchPayload {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
}
