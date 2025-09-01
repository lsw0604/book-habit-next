import { AddMyBookHistoryType } from '../schemas';

interface StepConfig {
  title: string;
  fields: (keyof AddMyBookHistoryType)[];
}
export type StepName = (typeof STEP_NAMES)[number];

export const STEP_NAMES = ['TIME', 'MOOD', 'PAGE', 'MEMO'] as const;

export const ADD_MY_BOOK_HISTORY_MODAL_CONFIG: Record<StepName, StepConfig> = {
  TIME: {
    title: '독서 시간 기록',
    fields: ['startTime', 'endTime', 'readingMinutes'],
  },
  MOOD: {
    title: '독서 감정 선택',
    fields: ['readingMood'],
  },
  PAGE: {
    title: '독서 페이지 기록',
    fields: ['startPage', 'endPage'],
  },
  MEMO: {
    title: '독서 메모',
    fields: ['memo'],
  },
} as const;
