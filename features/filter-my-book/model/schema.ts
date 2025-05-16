import { z } from 'zod';
import { MyBookOrder, MyBookStatus } from '@/entities/my-book/model';

export const myBookFilterSchema = z.object({
  order: z.enum([MyBookOrder.asc, MyBookOrder.desc], {
    errorMap: () => ({
      message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
    }),
  }),
  status: z.enum(
    [
      MyBookStatus.ALL,
      MyBookStatus.WANT_TO_READ,
      MyBookStatus.CURRENTLY_READING,
      MyBookStatus.READ,
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
  order: MyBookOrder.desc,
  status: MyBookStatus.ALL,
};
