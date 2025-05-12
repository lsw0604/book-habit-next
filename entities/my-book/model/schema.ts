import { z } from 'zod';

export const myBookParamsSchema = z.object({
  order: z.enum(['desc', 'asc'], {
    errorMap: () => ({
      message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
    }),
  }),
  status: z.enum(['ALL', 'WANT_TO_READ', 'CURRENTLY_READING', 'READ'], {
    errorMap: () => ({
      message:
        '검색 상태는 "ALL", "WANT_TO_READ", "CURRENTLY_READING" 또는 "READ"중 하나여야합니다.',
    }),
  }),
});

export type MyBookParamsType = z.infer<typeof myBookParamsSchema>;

export const DEFAULT_MY_BOOK_PARAMS: MyBookParamsType = {
  order: 'desc',
  status: 'ALL',
};
