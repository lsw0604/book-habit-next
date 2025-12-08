import { ResponsePagination } from '@/shared/types';

export interface BookSummaryDTO {
  title: string;
  isbn: string;
  authors: string[];
  translators: string[];
  status: string;
  pubDate: string;
  publisher: string;
  thumbnail: string | null;
  description: string;
}

export interface BookDetailDTO extends BookSummaryDTO {
  coverImage: string | null;
  subTitle: string;
  url: string;
  totalPage: number;
}

export type ResponseKakaoDTO = ResponsePagination<BookSummaryDTO>;
export type ResponseAladinDTO = BookDetailDTO;
