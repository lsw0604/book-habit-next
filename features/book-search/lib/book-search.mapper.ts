import type { BookSummaryDTO, BookSummary } from "@/entities/book";

import { formatAuthor, formatISBN, formatPubDate, formatTranslator } from "@/entities/book";

export const toSummaryBookViewModel = (dto: BookSummaryDTO): BookSummary => {
  const { isbn, pubDate, authors, translators } = dto;

  return {
    isbn: formatISBN(isbn),
    title: dto.title,
    pubDate: formatPubDate(pubDate),
    authors: formatAuthor(authors),
    translators: formatTranslator(translators),
    publisher: dto.publisher ?? '',
    status: dto.status ?? '',
    description: dto.description ?? '',
    thumbnail: dto.thumbnail,
  };
};