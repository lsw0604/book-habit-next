import { z } from 'zod';
import { FilterMyBookOrder, FilterMyBookStatus } from './filter-my-book.model';

export const myBookFilterSchema = z.object({
  order: z.enum([FilterMyBookOrder.asc, FilterMyBookOrder.desc], {
    errorMap: () => ({
      message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
    }),
  }),
  status: z.enum(
    [
      FilterMyBookStatus.ALL,
      FilterMyBookStatus.WANT_TO_READ,
      FilterMyBookStatus.CURRENTLY_READING,
      FilterMyBookStatus.READ,
    ],
    {
      errorMap: () => ({
        message:
          '검색 상태는 "ALL", "WANT_TO_READ", "CURRENTLY_READING" 또는 "READ"중 하나여야합니다.',
      }),
    }
  ),
});

export type MyBookFilterType = z.infer<typeof myBookFilterSchema>;

export const DEFAULT_MY_BOOK_FILTER: MyBookFilterType = {
  order: FilterMyBookOrder.desc,
  status: FilterMyBookStatus.ALL,
};
