export interface MyBookHistory {
  id: number;
  page: number;
  date: string;
  memo?: string;
  myBookId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyBookHistoryService {
  postMyBookHistory: (
    payload: RequestRegisterMyBookHistory
  ) => Promise<ResponseRegisterMyBookHistory>;
  getMyBookHistory: (
    payload: RequestGetMyBookHistory
  ) => Promise<ResponseGetMyBookHistory>;
  putMyBookHistory: (
    payload: RequestUpdateMyBookHistory
  ) => Promise<ResponseUpdateMyBookHistory>;
  deleteMyBookHistory: (
    payload: RequestDeleteMyBookHistory
  ) => Promise<ResponseDeleteMyBookHistory>;
}

// CREATE MyBookHistory에 대한 Type
export interface RequestRegisterMyBookHistory {
  myBookId: number;
  date: Date;
  page: number;
  memo?: string;
}

export interface ResponseRegisterMyBookHistory extends MyBookHistory {}

// READ MyBookHistory에 대한 Type
export interface RequestGetMyBookHistory {
  myBookId: number;
}

export interface ResponseGetMyBookHistory {
  [date: string]: MyBookHistory[];
}

// UPDATE MyBookHistory에 대한 Type
export interface RequestUpdateMyBookHistory {
  myBookHistoryId: number;
  page?: number;
  date?: Date;
  memo?: string;
}

export interface ResponseUpdateMyBookHistory extends MyBookHistory {}

// DELETE MyBookHistory에 대한 Type
export interface RequestDeleteMyBookHistory {
  myBookHistoryId: number;
}

export interface ResponseDeleteMyBookHistory extends MyBookHistory {}
