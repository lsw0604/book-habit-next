import { MyBookStatus } from '@/entities/my-book';

export type FilterMyBookStatus = MyBookStatus | 'ALL';

export enum FilterMyBookOrder {
  desc = 'desc',
  asc = 'asc',
}

export interface FilterBookStatusOption {
  readonly value: FilterMyBookStatus;
  readonly label: string;
}

export interface FilterBookOrderOption {
  readonly value: FilterMyBookOrder;
  readonly label: string;
}
