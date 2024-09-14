import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';

const bookQueries = createQueryKeys('book', {
  search: (params: RequestBookSearch) => ['book', 'search', params], // Ensure this returns a QueryKey
});

export const queries = mergeQueryKeys(bookQueries);
