import { MY_BOOK_STATUS_OPTIONS } from '../model/constants';
import type { MyBookStatus } from '../model/my-book.model';

export const getStatusLabel = (value?: MyBookStatus): string =>
  MY_BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
  String(value);
