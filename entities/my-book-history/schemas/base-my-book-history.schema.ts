import { z } from 'zod';

import { ReadingMood } from '../model';

const readingMoodSchema = z.nativeEnum(ReadingMood, {
  invalid_type_error: '독서 감정을 선택해주세요.',
  required_error: '독서 감정은 필수 선택 항목입니다.',
});

export const baseMyBookHistorySchema = z.object({
  startPage: z.preprocess(
    value => (value === '' || value === null ? 0 : Number(value)),
    z
      .number()
      .int()
      .min(1, { message: '시작 페이지는 1 이상이어야 합니다.' })
      .max(10000, { message: '페이지 수가 너무 큽니다.' })
  ),
  endPage: z.preprocess(
    value => (value === '' || value === null ? 0 : Number(value)),
    z
      .number()
      .int()
      .min(1, { message: '종료 페이지는 1 이상이어야 합니다.' })
      .max(10000, { message: '페이지 수가 너무 큽니다.' })
  ),
  startTime: z.date({
    required_error: '시작 시간은 필수입니다.',
    invalid_type_error: '유효한 날짜 형식이 아닙니다.',
  }),
  endTime: z.date({
    required_error: '종료 시간은 필수입니다.',
    invalid_type_error: '유효한 날짜 형식이 아닙니다.',
  }),
  readingMinutes: z
    .number()
    .int()
    .min(1, { message: '독서 시간(분)은 1분 이상이어야 합니다.' })
    .max(1440, { message: '하루(1440분)를 초과하여 기록할 수 없습니다.' }),
  memo: z.string().max(500, '메모는 500자 이하로 입력해주세요.').optional(), // 선택적 필드
  readingMood: readingMoodSchema, // 위에서 정의한 ReadingMood enum 스키마 사용
});

export const baseMyBookHistoryRefinement = (
  data: BaseMyBookHistoryType,
  ctx: z.RefinementCtx
) => {
  // 1. 종료 시간 > 시작 시간 검사
  if (data.endTime < data.startTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '종료 시간은 시작 시간보다 뒤여야 합니다.',
      path: ['endTime'],
    });
  }

  // 2. 종료 페이지 >= 시작 페이지 검사
  if (data.endPage < data.startPage) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        '종료 페이지는 시작 페이지보다 크거나 같은 값으로 입력해 주세요.',
      path: ['endPage'],
    });
  }

  // 3. 독서 시간과 시간 범위 일치 여부 검사
  if (data.startTime && data.endTime && data.readingMinutes >= 0) {
    const diffInMinutes =
      (data.endTime.getTime() - data.startTime.getTime()) / (1000 * 60);
    if (Math.abs(diffInMinutes - data.readingMinutes) > 1) {
      // 1분 오차 허용
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '독서 시간(분)이 시작/종료 시간으로 계산된 값과 다릅니다.',
        path: ['readingMinutes'],
      });
    }
  }
};

export type BaseMyBookHistoryType = z.infer<typeof baseMyBookHistorySchema>;
