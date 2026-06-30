import type { BookDetailDTO } from '../api';
import type { BookDetail } from '../model';

import {
  formatAuthor,
  formatISBN,
  formatPubDate,
  formatTotalPage,
  formatTranslator,
} from './book.formatter';

export const toDetailBookViewModel = (dto: BookDetailDTO): BookDetail => {
  const {
    totalPage,
    isbn,
    pubDate,
    authors,
    translators,
    ...rest
  } = dto;

  const formattedTotalPage = formatTotalPage(totalPage);
  const formattedISBN = formatISBN(isbn);
  const formattedPubDate = formatPubDate(pubDate);
  const formattedAuthor = formatAuthor(authors);
  const formattedTranslator = formatTranslator(translators);

  return {
    isbn: formattedISBN,
    pubDate: formattedPubDate,
    authors: formattedAuthor,
    translators: formattedTranslator,
    totalPage: formattedTotalPage,
    ...rest,
  };
};
