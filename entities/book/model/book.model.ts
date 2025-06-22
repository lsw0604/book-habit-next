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

export enum Sort {
  ACCURACY = 'accuracy',
  LATEST = 'latest',
}

export enum Target {
  TITLE = 'title',
  ISBN = 'isbn',
  PUBLISHER = 'publisher',
  PERSON = 'person',
}
