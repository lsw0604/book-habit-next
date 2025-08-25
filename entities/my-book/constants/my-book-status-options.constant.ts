import { MyBookStatus } from '../model';
import type { MyBookStatusOption } from '../types';

export const MY_BOOK_STATUS_OPTIONS: readonly MyBookStatusOption[] = [
  { value: MyBookStatus.WANT_TO_READ, label: '읽고 싶은 책' },
  { value: MyBookStatus.CURRENTLY_READING, label: '읽는 책' },
  { value: MyBookStatus.READ, label: '읽은 책' },
];
