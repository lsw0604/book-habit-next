export enum MyBookStatus {
  ALL = 'ALL',
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

export enum MyBookOrder {
  desc = 'desc',
  asc = 'asc',
}

export interface BookRating {
  readonly rating: number;
  readonly text: string;
}

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}
