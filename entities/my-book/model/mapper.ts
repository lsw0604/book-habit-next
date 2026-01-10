import { parseISO } from 'date-fns';

import { MyBookDTO, MyBooksDTO, MyBookDetailDTO } from '../api/my-book.dto'; // DTO 타입 임포트

import { MyBook, MyBooks, MyBookDetail, MyBookStatus } from './my-book.model';

export const toMyBookViewModel = (dto: MyBookDTO): MyBook => ({
  ...dto,
  status: dto.status as MyBookStatus,
});

export const toMyBooksViewModel = (dto: MyBooksDTO): MyBooks => ({
  meta: dto.meta,
  books: dto.books.map(toMyBookViewModel),
});

export const toMyBookDetailViewModel = (
  dto: MyBookDetailDTO
): MyBookDetail => ({
  ...dto,
  status: dto.status as MyBookStatus,
  createdAt: parseISO(dto.createdAt),
  updatedAt: parseISO(dto.updatedAt),
  book: {
    ...dto.book,
    datetime: parseISO(dto.book.datetime),
  },
});
