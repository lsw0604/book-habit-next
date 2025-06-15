export interface MyBookTag {
  myBookTagId: number;
  value: string;
}

export interface CreateMyBookTagPayload {
  myBookId: number;
  value: string;
}

export interface ResponseDeleteMyBookTag {
  myBookTagId: number;
}

export interface MyBookTagService {
  add: (payload: CreateMyBookTagPayload) => Promise<MyBookTag>;
  getAll: (myBookId: number) => Promise<MyBookTag[]>;
  delete: (myBookIdTag: number) => Promise<ResponseDeleteMyBookTag>;
}
