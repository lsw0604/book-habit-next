import type {
  BookDetailDTO,
  ResponseAladinDTO,
  ResponseKakaoDTO,
} from './book.dto';

export interface BookService {
  kakaoSearch: (payload: KakaoPayload) => Promise<ResponseKakaoDTO>;
  aladinSearch: (isbn: string) => Promise<ResponseAladinDTO>;
  findOrCreate: (isbn: string) => Promise<BookDetailDTO>;
}

export interface KakaoPayload {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
  target?: string;
}
