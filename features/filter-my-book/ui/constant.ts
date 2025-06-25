import { FilterMyBookOrder, FilterMyBookStatus } from '../model';
import { FilterBookOrderOption, FilterBookStatusOption } from './model';

export const FILTER_BOOK_STATUS_OPTIONS: readonly FilterBookStatusOption[] = [
  { value: FilterMyBookStatus.ALL, label: '전체보기' },
  { value: FilterMyBookStatus.WANT_TO_READ, label: '읽기전' },
  { value: FilterMyBookStatus.CURRENTLY_READING, label: '읽는중' },
  { value: FilterMyBookStatus.READ, label: '다읽음' },
];

export const FILTER_BOOK_ORDER_OPTIONS: readonly FilterBookOrderOption[] = [
  { value: FilterMyBookOrder.asc, label: '오름차순' },
  { value: FilterMyBookOrder.desc, label: '내림차순' },
];
