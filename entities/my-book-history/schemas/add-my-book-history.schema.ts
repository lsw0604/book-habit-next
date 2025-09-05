import { startOfToday } from 'date-fns';
import { z } from 'zod';

import { ReadingMood } from '../model';

import {
  baseMyBookHistoryRefinement,
  baseMyBookHistorySchema,
} from './base-my-book-history.schema';

export const addMyBookHistorySchema = baseMyBookHistorySchema
  .extend({
    myBookId: z
      .number()
      .int()
      .positive({ message: '도서 ID는 필수이며, 양의 정수여야 합니다.' }),
    date: z.date({
      required_error: '독서 날짜는 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
  })
  .superRefine(baseMyBookHistoryRefinement)
  .superRefine((data, ctx) => {
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
          message:
            '독서 시작 날짜가 선택한 독서 대표 날짜와 일치하지 않습니다.',
          path: ['startTime'],
        });
      }
    }
  });

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
