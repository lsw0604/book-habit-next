export type MyBookStatus = 'WANT_TO_READ' | 'CURRENTLY_READING' | 'READ';
export type MyBookOrder = 'desc' | 'asc';

export interface BookRating {
  readonly rating: number;
  readonly text: string;
}

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}
