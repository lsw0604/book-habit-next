import { FilterMyBookOrder, FilterMyBookStatus } from '../../model';

export interface FilterBookStatusOption {
  readonly value: FilterMyBookStatus;
  readonly label: string;
}

export interface FilterBookOrderOption {
  readonly value: FilterMyBookOrder;
  readonly label: string;
}
