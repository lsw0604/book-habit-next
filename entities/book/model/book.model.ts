export interface SearchBook {
  title: string;
  price: number;
  sale_price: number;
  publisher: string;
  url: string;
  thumbnail: string | null;
  status: string | null;
  contents: string | null;
  datetime: Date | null;
  authors: string[];
  isbns: string[];
  translators: string[];
}

export interface Book extends SearchBook {
  id: number;
}

export interface SerializedSearchBook extends Omit<SearchBook, 'datetime'> {
  datetime: string | null;
}

export interface SerializedBook extends SerializedSearchBook {
  id: number;
}
