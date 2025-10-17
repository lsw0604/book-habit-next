import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { authQueryKeys } from './auth';
import { bookQueryKeys } from './book';
import { myBookQueryKeys } from './my-book';
import { myBookHistoryQueryKeys } from './my-book-history';
import { myBookReviewQueryKeys } from './my-book-review';

export const queryKeys = mergeQueryKeys(
  myBookHistoryQueryKeys,
  myBookReviewQueryKeys,
  myBookQueryKeys,
  authQueryKeys,
  bookQueryKeys
);
