import type { BookDetailDTO } from './book.dto';

export interface BookService {
  fetchBookDetail: (isbn: string) => Promise<BookDetailDTO>;
  findOrCreate: (isbn: string) => Promise<BookDetailDTO>;
}
