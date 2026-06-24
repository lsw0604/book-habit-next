import { parseISO } from 'date-fns';

import { MyBookDTO, MyBooksDTO, MyBookDetailDTO } from '../api/my-book.dto'; // DTO 타입 임포트
import { MyBook, MyBooks, MyBookDetail } from '../model';
import { formattedISBN } from '@/shared/utils';
import { formattedAuthor, formattedTranslator, formattedTotalPage, formattedPubDate } from '@/entities/book';
import { calculateProgressPercentage } from './my-book.utils';

export const toMyBookViewModel = (dto: MyBookDTO): MyBook => {
  const { totalPage, currentPage, ...rest } = dto;

  return {
    ...rest,
    progressPercentage: calculateProgressPercentage(currentPage, totalPage),
  };
};

export const toMyBooksViewModel = (dto: MyBooksDTO): MyBooks => ({
  meta: dto.meta,
  books: dto.books.map(toMyBookViewModel),
});

export const toMyBookDetailViewModel = (
  dto: MyBookDetailDTO
): MyBookDetail => {
  const { book, ...restDTO } = dto;
  const { 
    isbn,
    authors, 
    translators, 
    totalpage, 
    coverImage, 
    url, 
    subTitle, 
    description, 
    stockStatus, 
    thumbnail,
    pubDate,
    ...restBookDto
   } = book;

  return {
    ...restDTO,
    createdAt: parseISO(dto.createdAt),
    updatedAt: parseISO(dto.updatedAt),
    book: {
      isbn: formattedISBN(isbn),
      authors: formattedAuthor(authors),
      translators: formattedTranslator(translators),
      totalPage: formattedTotalPage(totalpage),
      subTitle: subTitle ?? '',
      description: description ?? '',
      url: url ?? '',
      coverImage: coverImage ?? '',
      stockStatus: stockStatus ?? '',
      thumbnail: thumbnail ?? '',
      pubDate: formattedPubDate(pubDate),
      ...restBookDto
    },
  }
};
