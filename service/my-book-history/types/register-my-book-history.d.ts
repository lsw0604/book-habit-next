type RequestRegisterMyBookHistory = {
  myBookId: number;
  date: Date;
  page?: number;
  memo?: string;
};

type ResponseRegisterMyBookHistory = MyBookHistoryItemType;
