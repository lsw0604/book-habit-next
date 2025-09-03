import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { authQueryKeys } from './auth';
import { myBookQueryKeys } from './my-book';
import { myBookCommentQueryKeys } from './my-book-comment';
import { myBookHistoryQueryKeys } from './my-book-history';
import { publicCommentQueryKeys } from './public-comment';
import { searchQueryKeys } from './search';

export const queryKeys = mergeQueryKeys(
  publicCommentQueryKeys,
  myBookCommentQueryKeys,
  myBookHistoryQueryKeys,
  myBookQueryKeys,
  searchQueryKeys,
  authQueryKeys
);
