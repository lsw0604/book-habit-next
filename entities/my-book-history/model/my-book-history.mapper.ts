import { parseISO } from 'date-fns';
import { MyBookHistoryDTO } from '../api';
import { MyBookHistory, ReadingMood } from './my-book-history.model';

const stringToReadingMood = (readingMoodStr: string) => {
  if (Object.values(ReadingMood).includes(readingMoodStr as ReadingMood)) {
    return readingMoodStr as ReadingMood;
  }
  return ReadingMood.NEUTRAL;
};

export const toMyBookHistoryViewModel = (
  dto: MyBookHistoryDTO
): MyBookHistory => {
  return {
    ...dto,
    memo: dto.memo ? dto.memo : undefined,
    date: parseISO(dto.date),
    startTime: parseISO(dto.startTime),
    endTime: parseISO(dto.endTime),
    readingMood: stringToReadingMood(dto.readingMood),
    createdAt: parseISO(dto.createdAt),
    updatedAt: parseISO(dto.updatedAt),
  };
};
