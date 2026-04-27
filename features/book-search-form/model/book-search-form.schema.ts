import { z } from 'zod';

import {
  Sort,
  Target,
  BookSearchParams,
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_MAX_SIZE,
} from '@/entities/book/model';

export const bookSearchFormSchema = z.object({
  query: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
  size: z
    .number()
    .int()
    .min(BOOK_SEARCH_MIN_SIZE, {
      message: `검색 결과 크기는 최소 ${BOOK_SEARCH_MIN_SIZE}이어야 합니다.`,
    })
    .max(BOOK_SEARCH_MAX_SIZE, {
      message: `검색 결과 크기는 최대 ${BOOK_SEARCH_MAX_SIZE}까지 가능합니다.`,
    }),
  sort: z.enum([Sort.ACCURACY, Sort.LATEST], {
    errorMap: () => ({
      message: '정렬 방식은 "정확도순" 또는 "최신순"이어야 합니다.',
    }),
  }),
  target: z.enum([Target.TITLE, Target.ISBN, Target.PERSON, Target.PUBLISHER], {
    errorMap: () => ({
      message: '검색 대상은 "제목", "ISBN", "작가", 또는 "출판사"여야 합니다.',
    }),
  }),
});

export type BookSearchFormType = z.infer<typeof bookSearchFormSchema>;

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
const _checkType: BookSearchParams = {} as BookSearchFormType;

export const DEFAULT_BOOK_SEARCH_FORM: BookSearchFormType = {
  query: '',
  size: BOOK_SEARCH_MIN_SIZE,
  sort: Sort.ACCURACY,
  target: Target.TITLE,
};
