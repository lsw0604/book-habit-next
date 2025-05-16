import type { Book } from '@/entities/book/model/types';
import type { KakaoDocument } from '@/features/book-search/api/types';

export const formatISBNToArray = (item: KakaoDocument): Book => {
  const {
    authors,
    contents,
    datetime,
    isbn: isbnStr,
    price,
    publisher,
    sale_price,
    status,
    thumbnail,
    title,
    translators,
    url,
  } = item;

  const isbn = (isbn: string) => {
    const [first, second] = isbn.split(' ');
    if (first === '') return [second];
    return [first, second];
  };

  return {
    authors,
    contents,
    datetime,
    isbns: isbn(isbnStr),
    price,
    publisher,
    salePrice: sale_price,
    status,
    thumbnail,
    title,
    translators,
    url,
  };
};
