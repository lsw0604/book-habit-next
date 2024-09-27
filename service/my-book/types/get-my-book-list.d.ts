type RequestGetMyBookList = {
  status?: MyBookStatusType | 'ALL';
  page?: number;
  order?: MyBookOrderType;
};

type ResponseGetMyBookItemType = {
  id: number;
  title: string;
  thumbnail?: string;
  status: MyBookStatusType;
  rating: 0;
  hashtag: MyBookTagType[];
};

type ResponseGetMyBookList = {
  nextPage?: number;
  books: ResponseGetMyBookItemType[];
};

