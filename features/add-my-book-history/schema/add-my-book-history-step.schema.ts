import { z } from 'zod';

import {
  baseMyBookHistorySchema,
  pageRangeRefinement,
  timeRangeRefinement,
} from '@/entities/my-book-history';

import {
  type AddMyBookHistoryType,
  addMyBookHistoryDateSchema,
  readingDateRefinement,
} from './add-my-book-history.schema';

/**
 * 단계별 스키마는 전체 스키마(`addMyBookHistorySchema`)에서 잘라 쓰는 것이 아니라
 * 각 단계의 필드만으로 독립 구성한다.
 * zod는 `superRefine`을 객체 파싱이 모두 성공했을 때만 실행하므로,
 * 아직 입력하지 않은 뒷 단계 필드(예: 초기값 0인 페이지) 때문에
 * 앞 단계의 교차 검증이 통째로 건너뛰어지는 것을 막기 위함이다.
 */
const timeStepSchema = baseMyBookHistorySchema
  .pick({ startTime: true, endTime: true, readingMinutes: true })
  .merge(addMyBookHistoryDateSchema.pick({ date: true }))
  .superRefine(timeRangeRefinement)
  .superRefine(readingDateRefinement);

const pageStepSchema = baseMyBookHistorySchema
  .pick({ startPage: true, endPage: true })
  .superRefine(pageRangeRefinement);

const recordStepSchema = baseMyBookHistorySchema.pick({
  readingMood: true,
  memo: true,
});

export type AddMyBookHistoryStepId = 'time' | 'page' | 'record';

export type AddMyBookHistoryFieldName = keyof AddMyBookHistoryType;

export interface AddMyBookHistoryStep {
  id: AddMyBookHistoryStepId;
  label: string;
  description: string;
  schema: z.ZodTypeAny;
  fields: AddMyBookHistoryFieldName[];
}

export const ADD_MY_BOOK_HISTORY_STEPS: AddMyBookHistoryStep[] = [
  {
    id: 'time',
    label: '독서 시간',
    description: '얼마나 읽으셨나요?',
    schema: timeStepSchema,
    fields: ['startTime', 'endTime', 'readingMinutes'],
  },
  {
    id: 'page',
    label: '독서 페이지',
    description: '어디까지 읽으셨나요?',
    schema: pageStepSchema,
    fields: ['startPage', 'endPage'],
  },
  {
    id: 'record',
    label: '감상 기록',
    description: '오늘의 독서는 어떠셨나요?',
    schema: recordStepSchema,
    fields: ['readingMood', 'memo'],
  },
];

export const ADD_MY_BOOK_HISTORY_LAST_STEP_INDEX =
  ADD_MY_BOOK_HISTORY_STEPS.length - 1;
