import { MyBookHistory } from '../model';

import { MyBookHistoryDTO } from './my-book-history.dto';

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

export interface GetMyBookHistoriesPayload {
  myBookId: number;
}

export interface CreateMyBookHistoryPayload
  extends Pick<MyBookHistory, CreateMyBookHistoryPick> {}

export interface UpdateMyBookHistoryPayload
  extends Partial<Pick<MyBookHistory, UpdateMyBookHistoryPick>> {
  id: number;
}

export interface DeleteMyBookHistoryPayload {
  id: number;
}

export interface MyBookHistoryService {
  addMyBookHistory: (
    payload: CreateMyBookHistoryPayload
  ) => Promise<MyBookHistoryDTO>;
  getMyBookHistories: (
    payload: GetMyBookHistoriesPayload
  ) => Promise<MyBookHistoryDTO[]>;
  updateMyBookHistory: (
    payload: UpdateMyBookHistoryPayload
  ) => Promise<MyBookHistoryDTO>;
  deleteMyBookHistory: (
    payload: DeleteMyBookHistoryPayload
  ) => Promise<MyBookHistoryDTO>;
}
