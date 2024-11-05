type RequestUpdateMyBookHistory = {
  myBookHistoryId: number;
  page?: number;
  memo?: string;
  date?: Date;
};

type ResponseUpdateMyBookHistory = MyBookHistoryItemType;
