type RequestPutMyBookDetail = {
  status?: MyBookStatusType;
  rating?: number;
  myBookId: number;
};

type ResponsePutMyBookDetail = ResponseGetMyBookDetail;
