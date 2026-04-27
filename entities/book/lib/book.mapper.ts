import type { BookDetailDTO, BookSummaryDTO } from '../api';
import type { BookDetail, BookSummary } from '../model';

import { formattedAuthor, formattedISBN, formattedPubDate, formattedTotalPage, formattedTranslator } from './book.formatter';

export const toSummaryBookViewModel = (dto: BookSummaryDTO): BookSummary => {
  const isbn = formattedISBN(dto.isbn);
  const pubDate = formattedPubDate(dto.pubDate);
  const authors = formattedAuthor(dto.authors);
  const translators = formattedTranslator(dto.translators);

  return {
    isbn,
    title: dto.title,
    pubDate,
    authors,
    translators,
    publisher: dto.publisher ?? '',
    status: dto.status ?? '',
    description: dto.description ?? '',
    thumbnail: dto.thumbnail,
  };
};

export const toDetailBookViewModel = (dto: BookDetailDTO): BookDetail => {
  const { coverImage, subTitle, url, totalPage: totalPageDTO, ...rest } = dto;
  const bookSummary = toSummaryBookViewModel(rest);
  const totalPage = formattedTotalPage(totalPageDTO);

  return {
    ...bookSummary,
    coverImage,
    totalPage,
    subTitle,
    url,
  };
};
