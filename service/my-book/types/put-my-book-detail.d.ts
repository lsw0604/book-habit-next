type RequestPutMyBookDetail = {
  myBookStatus?: MyBookStatusType;
  rating?: number;
  myBookId: number;
};

type ResponsePutMyBookDetail = ResponseGetMyBookDetail;

type RequestPutMyBook = {
  myBookStatus?: MyBookStatusType;
  rating?: number;
  myBookId: number;
};

type ResponsePutMyBook = ResponseGetMyBookDetail;
