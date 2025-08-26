import { Book, BookCheck, BookOpen } from 'lucide-react';

import { MyBookStatus } from '@/entities/my-book/model';
import { ModeOption } from '@/shared/ui/mode-switch/types';

export const UPDATE_MY_BOOK_STATUS_OPTIONS: ModeOption<MyBookStatus>[] = [
  { value: MyBookStatus.WANT_TO_READ, label: '읽고 싶은 책', icon: Book },
  {
    value: MyBookStatus.CURRENTLY_READING,
    label: '읽는 책',
    icon: BookOpen,
  },
  { value: MyBookStatus.READ, label: '읽은 책', icon: BookCheck },
];
