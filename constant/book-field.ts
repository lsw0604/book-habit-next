export const BOOK_FIELDS: Array<keyof ReduxBookType> = [
  'authors',
  'contents',
  'datetime',
  'isbn',
  'price',
  'publisher',
  'sale_price',
  'status',
  'thumbnail',
  'title',
  'translators',
  'url',
] as const;
