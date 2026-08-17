import { startOfToday } from 'date-fns';
import { z } from 'zod';

import {
  ReadingMood,
  baseMyBookHistoryRefinement,
  baseMyBookHistorySchema,
} from '@/entities/my-book-history';

export const addMyBookHistoryDateSchema = z.object({
  myBookId: z
    .number()
    .int()
    .positive({ message: '도서 ID는 필수이며, 양의 정수여야 합니다.' }),
  date: z.date({
    required_error: '독서 날짜는 필수 입니다.',
    invalid_type_error: '유효한 날짜 형식이 아닙니다.',
  }),
});

/**
 * 독서 시작 시각이 선택한 대표 날짜와 같은 날인지 검사한다.
 * 전체 폼과 단계별(시간 단계) 스키마가 함께 사용한다.
 */
export const readingDateRefinement = (
  data: { date: Date; startTime: Date },
  ctx: z.RefinementCtx
) => {
  if (data.date && data.startTime) {
    const readingDate = new Date(data.date);
    const startTimeDate = new Date(data.startTime);
    if (
      readingDate.getFullYear() !== startTimeDate.getFullYear() ||
      readingDate.getMonth() !== startTimeDate.getMonth() ||
      readingDate.getDate() !== startTimeDate.getDate()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '독서 시작 날짜가 선택한 독서 대표 날짜와 일치하지 않습니다.',
        path: ['startTime'],
      });
    }
  }
};

export const addMyBookHistorySchema = baseMyBookHistorySchema
  .merge(addMyBookHistoryDateSchema)
  .superRefine(baseMyBookHistoryRefinement)
  .superRefine(readingDateRefinement);

export type AddMyBookHistoryType = z.infer<typeof addMyBookHistorySchema>;
const todayAtStart = startOfToday();

export const DEFAULT_ADD_MY_BOOK_HISTORY: AddMyBookHistoryType = {
  myBookId: 0,
  startPage: 0,
  endPage: 0,
  startTime: todayAtStart,
  endTime: todayAtStart,
  readingMinutes: 0,
  date: todayAtStart, // 현재 날짜로 초기화
  memo: '',
  readingMood: ReadingMood.NEUTRAL, // 기본 감정 상태
};
