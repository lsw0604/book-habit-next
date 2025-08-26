import { z } from 'zod';

import { MyBookStatus } from '@/entities/my-book/model';

export const updateMyBookSchema = z.object({
  rating: z
    .number()
    .min(0, {
      message: 'Rating은 0과 5 사이의 숫자로 입력해주세요.',
    })
    .max(5, {
      message: 'Rating은 0과 5 사이의 숫자로 입력해주세요.',
    })
    .optional(),
  status: z
    .enum(
      [
        MyBookStatus.CURRENTLY_READING,
        MyBookStatus.READ,
        MyBookStatus.WANT_TO_READ,
      ],
      {
        message: 'MyBookStatus는 올바른 값으로 입력해주세요.',
      }
    )
    .optional(),
});

export type UpdateMyBookType = z.infer<typeof updateMyBookSchema>;

export const DEFAULT_UPDATE_MY_BOOK: UpdateMyBookType = {
  rating: undefined,
  status: undefined,
};
