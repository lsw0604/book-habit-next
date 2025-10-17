import { isValid, parseISO } from 'date-fns';

import type { BookDTO, SearchBookDTO } from '../api';
import type {
  Book,
  SearchBook,
  SerializedBook,
  SerializedSearchBook,
} from '../model';

const parseAndValidateDate = (dateString: string | null): Date | null => {
  if (!dateString) {
    return null;
  }
  const date = parseISO(dateString);
  return isValid(date) ? date : null;
};

export const toBookViewModel = (dto: BookDTO): Book => ({
  id: dto.id,
  url: dto.url,
  title: dto.title,
  isbns: dto.isbns,
  price: dto.price,
  authors: dto.authors,
  publisher: dto.publisher,
  sale_price: dto.sale_price,
  translators: dto.translators,
  status: dto.status ? dto.status : null,
  contents: dto.contents ? dto.contents : null,
  thumbnail: dto.thumbnail ? dto.thumbnail : null,
  datetime: parseAndValidateDate(dto.datetime),
});

export const serializeBook = (viewModel: Book): SerializedBook => ({
  id: viewModel.id,
  authors: viewModel.authors,
  price: viewModel.price,
  sale_price: viewModel.sale_price,
  isbns: viewModel.isbns,
  publisher: viewModel.publisher,
  status: viewModel.status,
  thumbnail: viewModel.thumbnail,
  title: viewModel.title,
  translators: viewModel.translators,
  url: viewModel.url,
  contents: viewModel.contents,
  datetime: viewModel.datetime
    ? viewModel.datetime.toISOString()
    : viewModel.datetime,
});

export const deserializeBook = (serializable: SerializedBook): Book => ({
  id: serializable.id,
  authors: serializable.authors,
  contents: serializable.contents,
  sale_price: serializable.sale_price,
  datetime: parseAndValidateDate(serializable.datetime),
  isbns: serializable.isbns,
  price: serializable.price,
  publisher: serializable.publisher,
  status: serializable.status,
  thumbnail: serializable.thumbnail,
  title: serializable.title,
  translators: serializable.translators,
  url: serializable.url,
});

export const toSearchBookViewModel = (dto: SearchBookDTO): SearchBook => {
  const splitToISBN = (isbn: string): string[] =>
    isbn.split(' ').filter(s => s);

  return {
    authors: dto.authors,
    price: dto.price,
    publisher: dto.publisher,
    title: dto.title,
    translators: dto.translators,
    url: dto.url,
    isbns: splitToISBN(dto.isbn),
    sale_price: dto.sale_price,
    status: dto.status ? dto.status : null,
    contents: dto.contents ? dto.contents : null,
    thumbnail: dto.thumbnail ? dto.thumbnail : null,
    datetime: parseAndValidateDate(dto.datetime),
  };
};

export const serializeSearchBook = (
  viewModel: SearchBook
): SerializedSearchBook => ({
  authors: viewModel.authors,
  price: viewModel.price,
  sale_price: viewModel.sale_price,
  contents: viewModel.contents,
  datetime: viewModel.datetime
    ? viewModel.datetime.toISOString()
    : viewModel.datetime,
  isbns: viewModel.isbns,
  publisher: viewModel.publisher,
  status: viewModel.status,
  thumbnail: viewModel.thumbnail,
  title: viewModel.title,
  translators: viewModel.translators,
  url: viewModel.url,
});

export const deserializeSearchBook = (
  serializable: SerializedSearchBook
): SearchBook => ({
  authors: serializable.authors,
  contents: serializable.contents,
  sale_price: serializable.sale_price,
  datetime: parseAndValidateDate(serializable.datetime),
  isbns: serializable.isbns,
  price: serializable.price,
  publisher: serializable.publisher,
  status: serializable.status,
  thumbnail: serializable.thumbnail,
  title: serializable.title,
  translators: serializable.translators,
  url: serializable.url,
});
