import { parseISO } from 'date-fns';

import { MyBookHistoryDTO } from '../api/my-book-history.dto';

import {
  MyBookHistory,
  SerializedMyBookHistory,
  ReadingMood,
} from './my-book-history.model';

const stringToReadingMood = (readingMoodStr: string) => {
  if (Object.values(ReadingMood).includes(readingMoodStr as ReadingMood)) {
    return readingMoodStr as ReadingMood;
  }
  return ReadingMood.NEUTRAL;
};

/**
 * API로부터 받은 MyBookHistoryDTO(Raw Data)를 클라이언트에서 사용하기 위한 MyBookHistory(ViewModel)로 변환합니다.
 * DTO의 날짜 문자열들을 Date 객체로 파싱하고, readingMood 같은 추가적인 데이터를 처리합니다.
 * @param dto - 변환할 MyBookHistoryDTO 객체.
 * @returns 변환된 MyBookHistory(ViewModel) 객체.
 */
export const toMyBookHistoryViewModel = (
  dto: MyBookHistoryDTO
): MyBookHistory => ({
  id: dto.id,
  myBookId: dto.myBookId,
  startPage: dto.startPage,
  endPage: dto.endPage,
  readingMinutes: dto.readingMinutes,
  memo: dto.memo ? dto.memo : undefined,
  date: parseISO(dto.date),
  startTime: parseISO(dto.startTime),
  endTime: parseISO(dto.endTime),
  readingMood: stringToReadingMood(dto.readingMood),
  createdAt: parseISO(dto.createdAt),
  updatedAt: parseISO(dto.updatedAt),
});

/**
 * MyBookHistory(ViewModel)을 Redux 스토어에 저장하기 위해 직렬화 가능한 객체(SerializedMyBookHistory)로 변환합니다.
 * ViewModel의 Date 객체들을 ISO 문자열로 변환합니다.
 * @param viewModel - 직렬화할 MyBookHistory(ViewModel) 객체.
 * @returns 직렬화된 객체.
 */
export const serializeMyBookHistory = (
  viewModel: MyBookHistory
): SerializedMyBookHistory => ({
  id: viewModel.id,
  myBookId: viewModel.myBookId,
  startPage: viewModel.startPage,
  endPage: viewModel.endPage,
  readingMinutes: viewModel.readingMinutes,
  memo: viewModel.memo,
  readingMood: viewModel.readingMood,
  date: viewModel.date.toISOString(),
  startTime: viewModel.startTime.toISOString(),
  endTime: viewModel.endTime.toISOString(),
  createdAt: viewModel.createdAt.toISOString(),
  updatedAt: viewModel.updatedAt.toISOString(),
});

/**
 * Redux 스토어에서 가져온 직렬화된 객체(SerializedMyBookHistory)를 클라이언트에서 사용하기 위한 MyBookHistory(ViewModel)로 변환합니다.
 * 직렬화된 객체의 날짜 문자열들을 Date 객체로 파싱합니다.
 * @param serializable - 역직렬화할 객체.
 * @returns 변환된 MyBookHistory(ViewModel) 객체.
 */
export const deserializeMyBookHistory = (
  serializable: SerializedMyBookHistory
): MyBookHistory => ({
  id: serializable.id,
  myBookId: serializable.myBookId,
  startPage: serializable.startPage,
  endPage: serializable.endPage,
  readingMinutes: serializable.readingMinutes,
  memo: serializable.memo,
  readingMood: serializable.readingMood,
  date: parseISO(serializable.date),
  startTime: parseISO(serializable.startTime),
  endTime: parseISO(serializable.endTime),
  createdAt: parseISO(serializable.createdAt),
  updatedAt: parseISO(serializable.updatedAt),
});
