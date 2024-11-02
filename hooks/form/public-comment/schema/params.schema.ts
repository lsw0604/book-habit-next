import { z } from 'zod';

export type publicCommentParamsSchemaType = z.infer<
  typeof publicCommentParamsSchema
>;

export const publicCommentParamsSchema = z
  .object({
    pageSize: z
      .number()
      .int()
      .min(10, {
        message: '검색 결과 크기는 최소 10이어야 합니다.',
      })
      .max(50, {
        message: '검색 결과 크기는 최대 50까지 가능합니다.',
      }),
    startDate: z.date({
      required_error: '시작 날짜는 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
    endDate: z.date({
      required_error: '종료 날짜는 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: '시작 날짜는 종료 날짜보다 이전이거나 같아야 합니다.',
    path: ['startDate'],
  });
