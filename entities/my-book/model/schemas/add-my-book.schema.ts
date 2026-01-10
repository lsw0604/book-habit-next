import { z } from 'zod';

import { MyBookStatus } from '..';

export const addMyBookSchema = z.object({
  isbn: z
    .string({
      required_error: 'ISBN은 필수 입력 사항입니다.',
      invalid_type_error: 'ISBN은 문자열이어야 합니다.',
    })
    .min(1, 'ISBN을 입력해주세요.'),
  status: z.nativeEnum(MyBookStatus, {
    errorMap: (_issue, _ctx) => ({ message: '올바르지 않은 도서 상태입니다.' }),
  }),
});

export type AddMyBookType = z.infer<typeof addMyBookSchema>;

export const DEFAULT_ADD_MY_BOOK: AddMyBookType = {
  isbn: '',
  status: MyBookStatus.WANT_TO_READ,
};
