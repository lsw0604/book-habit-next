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

export type MyBookFilterStatus = MyBookStatus;
export type MyBookITemStatus = Exclude<MyBookStatus, MyBookStatus.ALL>;

export interface BookRating {
  readonly rating: number;
  readonly text: string;
}

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}

export interface BookOrder {
  readonly value: MyBookOrder;
  readonly label: string;
}
