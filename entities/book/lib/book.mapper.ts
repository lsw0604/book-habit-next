import type { BookDTO } from '../api';
import type { Book } from '../model';

export const toBookViewModel = (dto: BookDTO): Book => {
  const splitToISBN = (isbn: string) => {
    const [first, second] = isbn.split(' ');
    if (first === '') return [second];
    return [first, second];
  };

  return {
    authors: dto.authors,
    contents: dto.contents,
    datetime: dto.datetime,
    price: dto.price,
    publisher: dto.publisher,
    status: dto.status,
    thumbnail: dto.thumbnail,
    title: dto.title,
    translators: dto.translators,
    url: dto.url,
    isbns: splitToISBN(dto.isbn),
    salePrice: dto.sale_price,
  };
};
