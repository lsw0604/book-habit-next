import { MyBookDTO, MyBooksDTO, MyBookDetailDTO } from '../api/my-book.dto'; // DTO 타입 임포트
import { MyBook, MyBooks, MyBookDetail } from '../model';
import { formatAuthor, formatISBN, formatPubDate, formatTotalPage, formatTranslator } from '@/entities/book';
import { calculateProgressPercentage } from './my-book.utils';
import { normalizedDate } from '@/shared/utils';

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
    totalPage, 
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
    createdAt: normalizedDate(dto.createdAt),
    updatedAt: normalizedDate(dto.updatedAt),
    book: {
      ...restBookDto,
      isbn: formatISBN(isbn),
      authors: formatAuthor(authors),
      translators: formatTranslator(translators),
      totalPage: formatTotalPage(totalPage),
      subTitle: subTitle ?? '',
      description: description ?? '',
      url: url ?? '',
      coverImage: coverImage ?? '',
      stockStatus: stockStatus ?? '',
      thumbnail: thumbnail ?? '',
      pubDate: formatPubDate(pubDate),
    },
  }
};
