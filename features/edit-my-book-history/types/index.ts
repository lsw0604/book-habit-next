import { EditMyBookHistoryType } from '@/entities/my-book-history';

export type UpdatableFields = keyof Pick<
  EditMyBookHistoryType,
  | 'startPage'
  | 'endPage'
  | 'startTime'
  | 'endTime'
  | 'readingMinutes'
  | 'readingMood'
  | 'memo'
>;
