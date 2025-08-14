import { MY_BOOK_STATUS_OPTIONS } from '@/entities/my-book/model';

import { FilterMyBookOrder } from './filter-my-book.model';
import { FilterBookOrderOption, FilterBookStatusOption } from './types';

export const FILTER_BOOK_STATUS_OPTIONS: readonly FilterBookStatusOption[] = [
  { value: 'ALL', label: '전체보기' },
  ...MY_BOOK_STATUS_OPTIONS,
];

export const FILTER_BOOK_ORDER_OPTIONS: readonly FilterBookOrderOption[] = [
  { value: FilterMyBookOrder.asc, label: '오름차순' },
  { value: FilterMyBookOrder.desc, label: '내림차순' },
];
