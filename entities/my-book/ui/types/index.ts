import { MyBookStatus } from '../../model';

export interface BookRatingOption {
  readonly rating: number;
  readonly text: string;
}

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}
