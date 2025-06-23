import type { PaginationMeta } from '@/shared/pagination/types';

export interface MyBookDTO {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  status: string;
}

export interface MyBooksDTO {
  books: MyBookDTO[];
  meta: PaginationMeta;
}

export interface MyBookDetailDTO {
  id: number;
  status: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  book: {
    url: string;
    title: string;
    thumbnail: string;
    contents: string;
    publisher: string;
    datetime: string;
    isbns: string[];
    authors: string[];
    translators: string[];
  };
}
