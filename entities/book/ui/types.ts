import { HTMLAttributes, ReactNode } from 'react';

import { Book } from '../model';

export interface BookCardContainerProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  className?: string;
}

export interface BookCardImageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  item: Pick<Book, 'title' | 'thumbnail' | 'isbns'>;
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
  salePrice: number;
}

export interface BookCardPublisherProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  publisher: string;
  datetime: string;
}

export interface BookCardTitleProps extends HTMLAttributes<HTMLHeadElement> {
  className?: string;
  children: React.ReactNode;
}
