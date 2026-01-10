import { PaginationMeta } from '@/shared/types';

export enum MyBookStatus {
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

export interface MyBook {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  status: MyBookStatus;
}

export interface MyBooks {
  books: MyBook[];
  meta: PaginationMeta;
}

export interface MyBookDetail {
  id: number;
  status: MyBookStatus;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  book: {
    url: string;
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
    datetime: Date;
    isbns: string[];
    authors: string[];
    translators: string[];
  };
}

export interface BookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}

export interface MyBookStatusOption {
  readonly value: MyBookStatus;
  readonly label: string;
}
