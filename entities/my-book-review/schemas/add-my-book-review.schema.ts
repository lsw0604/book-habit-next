import { z } from 'zod';

export const addMyBookReviewSchema = z.object({
  myBookId: z
    .number()
    .int({ message: 'ID는 정수여야 합니다.' })
    .positive({ message: 'ID는 0보다 커야 합니다.' }),
  isPublic: z.boolean({
    required_error: '공개 여부를 선택하세요.',
  }),
  review: z
    .string()
    .min(15, { message: '한줄평은 15자 이상 입력해주세요.' })
    .max(150, { message: '한줄평은 150자를 넘을 수 없습니다.' }),
});

export type AddMyBookReviewType = z.infer<typeof addMyBookReviewSchema>;

export const DEFAULT_ADD_MY_BOOK_REVIEW: AddMyBookReviewType = {
  myBookId: 0,
  isPublic: true,
  review: '',
};
