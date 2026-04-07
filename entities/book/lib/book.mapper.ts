import type { BookDetailDTO, BookSummaryDTO } from '../api';
import type { BookDetail, BookSummary } from '../model';

import { formattedISBN, formattedPubDate } from './book.formatter';

export const toSummaryBookViewModel = (dto: BookSummaryDTO): BookSummary => {
  const isbn = formattedISBN(dto.isbn);
  const pubDate = formattedPubDate(dto.pubDate);

  return {
    isbn,
    title: dto.title,
    authors: dto.authors,
    pubDate,
    translators: dto.translators,
    publisher: dto.publisher ?? '',
    status: dto.status ?? '',
    description: dto.description ?? '',
    thumbnail: dto.thumbnail,
  };
};

export const toDetailBookViewModel = (dto: BookDetailDTO): BookDetail => {
  const { coverImage, totalPage, subTitle, url, ...rest } = dto;
  const bookSummary = toSummaryBookViewModel(rest);

  return {
    ...bookSummary,
    coverImage,
    totalPage,
    subTitle,
    url,
  };
};
