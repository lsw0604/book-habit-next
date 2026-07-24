export interface BookDetailDTO {
  title: string;
  isbn: string;
  authors: string[];
  translators: string[];
  status: string;
  pubDate: string;
  publisher: string;
  thumbnail: string | null;
  description: string;
  coverImage: string | null;
  subTitle: string;
  url: string;
  totalPage: number | null;
}

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
