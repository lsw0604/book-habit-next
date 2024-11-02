import { z } from 'zod';

export type MyBookParamsSchemaType = z.infer<typeof myBookParamsSchema>;

export const myBookParamsSchema = z.object({
  order: z.enum(['desc', 'asc'], {
    errorMap: () => ({
      message: '정렬 방식은 "오름차순" "내림차순" 이어야 합니다.',
    }),
  }),
  status: z.enum(['ALL', 'READ', 'READING', 'TO_READ', 'START_READ'], {
    errorMap: () => ({
      message:
        '검색 상태는 "ALL", "READ", "READING", "TO_READ" 또는 "START_READ"중 하나여야합니다.',
    }),
  }),
});
