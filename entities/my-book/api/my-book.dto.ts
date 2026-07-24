import type { PaginationMeta } from '@/shared/types';
import { MyBookStatus } from '../model';

export interface MyBookDTO {
  id: number;
  status: MyBookStatus;
  rating: number;
  currentPage: number;
  title: string;
  thumbnail: string | null;
  totalPage: number | null;
}

export interface MyBooksDTO {
  books: MyBookDTO[];
  meta: PaginationMeta;
}

export interface MyBookDetailDTO {
  id: number;
  userId: number;
  bookId: number;
  status: MyBookStatus;
  rating: number;
  currentPage: number;
  createdAt: string;
  updatedAt: string;
  book: {
    title: string;
    subTitle: string | null;
    thumbnail: string | null;
    coverImage: string | null;
    url: string | null;
    description: string;
    publisher: string;
    pubDate: string;
    totalPage: number | null;
    stockStatus: string | null;
    isbn: string;
    authors: string[];
    translators: string[];
  };
  _count: {
    review: number;
    history: number;
  }
}

