import { PaginationMeta } from '@/shared/pagination/types';

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

export enum MyBookStatus {
  ALL = 'ALL',
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

export enum MyBookOrder {
  desc = 'desc',
  asc = 'asc',
}
