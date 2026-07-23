import { z } from 'zod';

export const REVIEW_MIN_LENGTH = 15;
export const REVIEW_MAX_LENGTH = 150;

export const updateMyBookReviewSchema = z.object({
  isPublic: z.boolean({
    required_error: '공개 여부를 선택해주세요.',
    invalid_type_error: '공개 여부는 boolean 값이어야 합니다.',
  }),
  review: z
    .string({ required_error: '한줄평을 입력해주세요.' })
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(REVIEW_MIN_LENGTH, {
          message: `한줄평은 최소 ${REVIEW_MIN_LENGTH}자 이상 입력해주세요.`,
        })
        .max(REVIEW_MAX_LENGTH, {
          message: `한줄평은 최대 ${REVIEW_MAX_LENGTH}자를 넘을 수 없습니다.`,
        })
    ),
});

export type UpdateMyBookReviewType = z.infer<typeof updateMyBookReviewSchema>;

export const DEFAULT_UPDATE_MY_BOOK_REVIEW: UpdateMyBookReviewType = {
  isPublic: true,
  review: '',
};
