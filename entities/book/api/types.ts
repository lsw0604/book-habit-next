import { Sort, Target } from '../model/book.model';

import { ResponseSearchDTO } from './book.dto';

export interface BookService {
  search: (payload: SearchPayload) => Promise<ResponseSearchDTO>;
}

export interface SearchPayload {
  query: string;
  sort?: Sort;
  page?: number;
  size?: number;
  target?: Target;
}
