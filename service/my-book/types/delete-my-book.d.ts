type ResponseDeleteMyBook = {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  myBookStatus: MyBookStatusType;
  createdAt: string;
  updatedAt: string;
};

type RequestDeleteMyBook = number;
