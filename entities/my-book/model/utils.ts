import { MY_BOOK_STATUS_OPTIONS } from './constants';
import { MyBookStatus } from './types';

export const getMyBookStatusLabel = (value?: MyBookStatus) =>
  MY_BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
  String(value);
