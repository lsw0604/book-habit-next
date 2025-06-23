import { MyBookOrder, MyBookStatus } from '../../model';

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
