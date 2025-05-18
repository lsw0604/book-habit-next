import { KakaoDocument } from '@/features/book-search/api/types';
import { HTMLAttributes, ReactNode } from 'react';

export interface Book {
  title: string;
  thumbnail: string;
  status: string;
  price: number;
  salePrice: number;
  authors: string[];
  isbns: string[];
  translators: string[];
  contents: string;
  datetime: string;
  publisher: string;
  url: string;
}

export type BookFieldUpdate =
  | { field: 'title'; value: string }
  | { field: 'publisher'; value: string }
  | { field: 'price'; value: number }
  | { field: 'salePrice'; value: number }
  | { field: 'thumbnail'; value: string }
  | { field: 'contents'; value: string }
  | { field: 'url'; value: string }
  | { field: 'datetime'; value: string }
  | { field: 'status'; value: string }
  | { field: 'authors'; value: string[] }
  | { field: 'translators'; value: string[] }
  | { field: 'isbn'; value: string[] };

export interface BookCardContainerProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  className?: string;
}

export interface BookCardImageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: Pick<KakaoDocument, 'thumbnail' | 'title' | 'isbn'>;
}

export interface BookCardContentProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  content: string;
}

export interface BookCardAuthorProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  authors: string[];
  translators: string[];
}

export interface BookCardISBNProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface BookCardPriceProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  price: number;
  sale_price: number;
}

export interface BookCardPublisherProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  publisher: string;
  datetime: string;
}
