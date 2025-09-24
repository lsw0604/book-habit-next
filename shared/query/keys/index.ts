import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { authQueryKeys } from './auth';
import { myBookQueryKeys } from './my-book';
import { myBookHistoryQueryKeys } from './my-book-history';
import { myBookReviewQueryKeys } from './my-book-review';
import { searchQueryKeys } from './search';

export const queryKeys = mergeQueryKeys(
  myBookHistoryQueryKeys,
  myBookReviewQueryKeys,
  myBookQueryKeys,
  searchQueryKeys,
  authQueryKeys
);
