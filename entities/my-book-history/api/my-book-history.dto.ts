export interface MyBookHistoryDTO {
  id: number;
  myBookId: number;
  startPage: number;
  endPage: number;
  startTime: string;
  endTime: string;
  readingMinutes: number;
  date: string;
  memo: string | null;
  readingMood: string;
  createdAt: string;
  updatedAt: string;
}
