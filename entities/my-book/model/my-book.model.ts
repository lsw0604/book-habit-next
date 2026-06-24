import type { PaginationMeta } from '@/shared/types';

export enum MyBookStatus {
  WANT_TO_READ = 'WANT_TO_READ',
  CURRENTLY_READING = 'CURRENTLY_READING',
  READ = 'READ',
}

export interface MyBook {
  id: number;
  title: string;
  thumbnail: string | null;
  rating: number;
  status: MyBookStatus;
  progressPercentage: number | null;
}

export interface MyBooks {
  books: MyBook[];
  meta: PaginationMeta;
}

export interface MyBookDetail {
  id: number;
  userId: number;
  bookId: number;
  status: MyBookStatus;
  rating: number;
  currentPage: number;
  createdAt: Date;
  updatedAt: Date;
  book: {
    title: string;
    subTitle: string;
    isbn: string;
    authors: string;
    translators: string;
    publisher: string;
    thumbnail: string;
    coverImage: string;
    description: string;
    url: string;
    pubDate: string;
    totalPage: string;
    stockStatus: string;
  };
  _count: {
    review: number;
    history: number;
  }
}