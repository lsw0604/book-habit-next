import { Replace } from '@/shared/types/replace';

export interface MyBookHistory {
  id: number;
  myBookId: number;
  startPage: number;
  endPage: number;
  startTime: Date;
  endTime: Date;
  readingMinutes: number;
  date: Date;
  memo?: string;
  readingMood: ReadingMood;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedMyBookHistory
  extends Replace<
    MyBookHistory,
    'startTime' | 'endTime' | 'date' | 'createdAt' | 'updatedAt',
    string
  > {}

export enum ReadingMood {
  INSPIRED = 'INSPIRED',
  EXCITED = 'EXCITED',
  INTRIGUED = 'INTRIGUED',
  SATISFIED = 'SATISFIED',
  NEUTRAL = 'NEUTRAL',
  CONFUSED = 'CONFUSED',
  DISAPPOINTED = 'DISAPPOINTED',
  BORED = 'BORED',
  EMOTIONAL = 'EMOTIONAL',
  THOUGHTFUL = 'THOUGHTFUL',
  CHALLENGED = 'CHALLENGED',
  ENLIGHTENED = 'ENLIGHTENED',
}
