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

export interface BookSearchParams {
  query: string;
  size: number;
  sort: Sort;
  target: Target;
}
