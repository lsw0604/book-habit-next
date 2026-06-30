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