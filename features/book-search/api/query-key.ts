import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { BookSearchParams } from "../schema";

export const bookSearchQueryKeys = createQueryKeys('bookSearch', {
  search: (params: Omit<BookSearchParams, 'page'>) => ({
    queryKey: [params]
  })
})