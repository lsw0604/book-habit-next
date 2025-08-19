import { AddMyBookHistoryType } from '../model/schema';

export const STEPS = {
  FIRST: 1,
  LAST: 4,
  TIME: 1,
  MOOD: 2,
  PAGE: 3,
  MEMO: 4,
} as const;

export const STEP_CONFIG = {
  [STEPS.TIME]: {
    title: '독서 시간 기록',
    fields: [
      'startTime',
      'endTime',
      'readingMinutes',
    ] as (keyof AddMyBookHistoryType)[],
  },
  [STEPS.MOOD]: {
    title: '독서 감정 선택',
    fields: ['readingMood'] as (keyof AddMyBookHistoryType)[],
  },
  [STEPS.PAGE]: {
    title: '페이지 기록',
    fields: ['startPage', 'endPage'] as (keyof AddMyBookHistoryType)[],
  },
  [STEPS.MEMO]: {
    title: '독서 메모',
    fields: ['memo'] as (keyof AddMyBookHistoryType)[],
  },
} as const;
