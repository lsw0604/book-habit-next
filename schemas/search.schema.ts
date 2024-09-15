import { z } from 'zod';

export type SearchType = z.infer<typeof searchSchema>;

export const searchSchema = z.object({
  search: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
  sort: z.enum(['accuracy', 'latest']),
  size: z.number().min(10).max(50),
  target: z.enum(['title', 'isbn', 'publisher', 'person']),
});
