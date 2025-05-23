import { z } from 'zod';
import { MY_BOOK_STATUS } from '@/constant/my-book-item';

export const myBookUpdateSchema = z.object({
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
    .enum(MY_BOOK_STATUS as [MyBookStatusType, ...MyBookStatusType[]], {
      message: 'MyBookStatus는 올바른 값으로 입력해주세요.',
    })
    .optional(),
});

export type MyBookUpdateType = z.infer<typeof myBookUpdateSchema>;

export const DEFAULT_MY_BOOK_UPDATE: MyBookUpdateType = {
  rating: undefined,
  status: undefined as MyBookStatusType | undefined,
};
