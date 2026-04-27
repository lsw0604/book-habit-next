import { z } from 'zod';

import {
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_MIN_SIZE,
} from './book-search-params.constant';
import { Sort, Target } from './book-search-params.model';  

export const bookSearchParamsSchema = z.object({
  query: z.string().default(''),
  size: z.coerce
    .number()
    .min(BOOK_SEARCH_MIN_SIZE)
    .max(BOOK_SEARCH_MAX_SIZE)
    .catch(BOOK_SEARCH_MIN_SIZE),
  sort: z.nativeEnum(Sort).catch(Sort.ACCURACY),
  target: z.nativeEnum(Target).catch(Target.TITLE),
});

export type BookSearchParams = z.infer<typeof bookSearchParamsSchema>;

export const DEFAULT_BOOK_SEARCH_PARAMS: BookSearchParams = {
  query: '',
  size: BOOK_SEARCH_MIN_SIZE,
  sort: Sort.ACCURACY,
  target: Target.TITLE,
};