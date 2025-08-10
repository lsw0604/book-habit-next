import { FilterMyBookOrder, FilterMyBookStatus } from './filter-my-book.model';

export interface FilterBookStatusOption {
  readonly value: FilterMyBookStatus;
  readonly label: string;
}

export interface FilterBookOrderOption {
  readonly value: FilterMyBookOrder;
  readonly label: string;
}
