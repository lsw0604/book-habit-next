import type { ResponseSearchDTO } from './book.dto';

export interface BookService {
  search: (payload: SearchPayload) => Promise<ResponseSearchDTO>;
}

export interface SearchPayload {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
}
