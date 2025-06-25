import { BookDTO } from '../api';
import { Book } from '../model';

export const toBookViewModel = (dto: BookDTO): Book => {
  const isbn = (isbn: string) => {
    const [first, second] = isbn.split(' ');
    if (first === '') return [second];
    return [first, second];
  };

  return {
    ...dto,
    isbns: isbn(dto.isbn),
    salePrice: dto.sale_price,
  };
};
