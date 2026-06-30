import type { BookSearchParams } from '../model';

import type { BookSearchsDTO } from './book-search.dto';

export interface BookSearchRequestParams extends BookSearchParams {
  page?: number;
}

export interface BookSearchService {
  searchBook: (
    payload: BookSearchRequestParams
  ) => Promise<BookSearchsDTO>;
}