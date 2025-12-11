export interface BookSummary {
  isbn: string;
  title: string;
  authors: string;
  translators: string;
  status: string;
  pubDate: string;
  publisher: string;
  thumbnail: string | null;
  description: string;
}

export interface BookDetail extends BookSummary {
  coverImage: string | null;
  subTitle: string | null;
  url: string | null;
  totalPage: number;
}
