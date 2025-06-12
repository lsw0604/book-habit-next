import { MyBookHistory } from '../model/types';

type CreateMyBookHistoryPick =
  | 'myBookId'
  | 'startPage'
  | 'endPage'
  | 'startTime'
  | 'endTime'
  | 'readingMinutes'
  | 'date'
  | 'memo'
  | 'readingMood';

type UpdateMyBookHistoryPick =
  | 'startPage'
  | 'endPage'
  | 'startTime'
  | 'endTime'
  | 'readingMinutes'
  | 'date'
  | 'memo'
  | 'readingMood';

export interface CreateMyBookHistoryPayload
  extends Pick<MyBookHistory, CreateMyBookHistoryPick> {}

export interface UpdateMyBookHistoryPayload
  extends Partial<Pick<MyBookHistory, UpdateMyBookHistoryPick>> {
  id: number;
}

export interface ResponseRegisterMyBookHistory extends MyBookHistory {}
export interface ResponseGetMyBookHistory extends MyBookHistory {}
export interface ResponseDeleteMyBookHistory extends MyBookHistory {}
export interface ResponseUpdateMyBookHistory extends MyBookHistory {}

export interface MyBookHistoryService {
  addMyBookHistory: (
    payload: CreateMyBookHistoryPayload
  ) => Promise<MyBookHistory>;
  getMyBookHistories: (myBookId: number) => Promise<MyBookHistory[]>;
  updateMyBookHistory: (
    payload: UpdateMyBookHistoryPayload
  ) => Promise<MyBookHistory>;
  deleteMyBookHistory: (myBookHistoryId: number) => Promise<MyBookHistory>;
}
