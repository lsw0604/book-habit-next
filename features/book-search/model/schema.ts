import { z } from 'zod';

export const bookSearchParamsSchema = z.object({
  query: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
  size: z
    .number()
    .int()
    .min(10, {
      message: '검색 결과 크기는 최소 10이어야 합니다.',
    })
    .max(50, {
      message: '검색 결과 크기는 최대 50까지 가능합니다.',
    }),
  sort: z.enum(['accuracy', 'latest'], {
    errorMap: () => ({
      message: '정렬 방식은 "정확도순" 또는 "최신순"이어야 합니다.',
    }),
  }),
  target: z.enum(['title', 'isbn', 'person', 'publisher'], {
    errorMap: () => ({
      message: '검색 대상은 "제목", "ISBN", "작가", 또는 "출판사"여야 합니다.',
    }),
  }),
});

export type BookSearchParamsType = z.infer<typeof bookSearchParamsSchema>;

export const DEFAULT_BOOK_SEARCH_PARAMS: BookSearchParamsType = {
  query: '',
  size: 10,
  sort: 'accuracy',
  target: 'title',
};
