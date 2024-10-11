type RequestGetMyBookDetail = number;

type ResponseGetMyBookDetail = {
  id: number;
  book: MyBookDetailType;
  rating: number;
  status: MyBookStatusType;
  tag: MyBookTagType[];
  createdAt: string;
  updatedAt: string;
};

type MyBookDetailType = {
  isbn: string[];
  authors: MyBookAuthorType[];
  contents: string;
  datetime: string;
  publisher: string;
  thumbnail: string;
  title: string;
  translators: MyBookTranslatorType[];
  url: string;
};
