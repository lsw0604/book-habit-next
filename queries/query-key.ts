import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { myBookQueryKeys } from './my-book';
import { searchQueryKeys } from './search';
import { authQueryKeys } from './auth';
import { publicCommentQueryKeys } from './public-comment';
import { myBookCommentQueryKeys } from './my-book-comment';

export const queryKeys = mergeQueryKeys(
  publicCommentQueryKeys,
  myBookCommentQueryKeys,
  myBookQueryKeys,
  searchQueryKeys,
  authQueryKeys
);
