import { BookDTO } from '../api';

import { Book } from './book.model';

export const toBookViewModel = (dto: BookDTO): Book => {
  const splitToISBN = (isbn: string) => {
    const [first, second] = isbn.split(' ');
    if (first === '') return [second];
    return [first, second];
  };

  return {
    ...dto,
    isbns: splitToISBN(dto.isbn),
    salePrice: dto.sale_price,
  };
};
