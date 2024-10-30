import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { myBookQueryKeys } from './my-book';
import { searchQueryKeys } from './search';
import { authQueryKeys } from './auth';
import { myBookCommentQueryKeys } from './my-book-comment';

export const queryKeys = mergeQueryKeys(
  myBookCommentQueryKeys,
  myBookQueryKeys,
  searchQueryKeys,
  authQueryKeys
);
