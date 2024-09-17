import { z } from 'zod';

export type SearchType = z.infer<typeof searchSchema>;

export const searchSchema = z.object({
  query: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
});
