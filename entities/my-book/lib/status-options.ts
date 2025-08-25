import { MY_BOOK_STATUS_OPTIONS } from '../constants';
import type { MyBookStatus } from '../model';

export const getStatusLabel = (value?: MyBookStatus): string =>
  MY_BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
  String(value);
