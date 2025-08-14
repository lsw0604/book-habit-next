import { HTMLAttributes } from 'react';

import { MyBook, MyBookStatus } from './my-book.model';

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}

export interface MyBookItemProps extends HTMLAttributes<HTMLLIElement> {
  book: MyBook;
}
