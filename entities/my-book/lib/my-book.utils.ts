import { MY_BOOK_STATUS_OPTIONS, MyBookStatus } from '../model';

export const getMyBookStatusLabel = (value?: MyBookStatus) =>
  MY_BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
  String(value);
