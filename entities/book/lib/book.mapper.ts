import type { BookSummaryDTO } from '../api';
import type { BookSummary } from '../model';

import {
  formattedAuthor,
  formattedISBN,
  formattedPubDate,
  formattedTranslator,
} from './book.formatter';

export const toSummaryBookViewModel = (dto: BookSummaryDTO): BookSummary => {
  const isbn = formattedISBN(dto.isbn);
  const authors = formattedAuthor(dto.authors);
  const translators = formattedTranslator(dto.translators);
  const pubDate = formattedPubDate(dto.pubDate);

  return {
    isbn,
    title: dto.title,
    authors,
    pubDate,
    translators,
    publisher: dto.publisher ?? '',
    status: dto.status ?? '',
    description: dto.description ?? '',
    thumbnail: dto.thumbnail,
  };
};
