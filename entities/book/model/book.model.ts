export interface BookDetail {
  isbn: string;
  title: string;
  authors: string;
  translators: string;
  status: string;
  pubDate: string;
  publisher: string;
  thumbnail: string | null;
  description: string;
  coverImage: string | null;
  subTitle: string | null;
  url: string | null;
  totalPage: string;
}
