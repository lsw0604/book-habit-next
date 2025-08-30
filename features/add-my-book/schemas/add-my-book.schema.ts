import { z } from 'zod';

export const addMyBookSchema = z.object({
  title: z.string(), // 도서 제목
  contents: z.string(), // 도서 소개
  url: z.string().url(), // 도서 상세 URL
  isbns: z.array(z.string()), // ISBN10 또는 ISBN13 형식의 국제 표준 도서번호
  datetime: z.string().refine(val => !Number.isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }), // 도서 출판날짜, ISO 8601 형식
  authors: z.array(z.string()), // 도서 저자 리스트
  publisher: z.string(), // 도서 출판사
  translators: z.array(z.string()), // 도서 번역자 리스트
  price: z.number(), // 도서 정가
  salePrice: z.number(), // 도서 판매가
  thumbnail: z.string().optional(), // 도서 표지 미리보기 URL
  status: z.string().optional(), // 도서 판매 상태 정보 (정상, 품절, 절판 등)
});

export type AddMyBookType = z.infer<typeof addMyBookSchema>;

export const DEFAULT_ADD_MY_BOOK: AddMyBookType = {
  title: '',
  contents: '',
  url: '',
  isbns: [],
  datetime: '',
  authors: [],
  publisher: '',
  translators: [],
  price: 0,
  salePrice: 0,
  thumbnail: '',
  status: '',
};
