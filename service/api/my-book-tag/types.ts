export interface MyBookTagService {
  postMyBookTag: (
    payload: RequestPostMyBookTag
  ) => Promise<ResponsePostMyBookTag>;
  deleteMyBookTag: (
    payload: RequestDeleteMyBookTag
  ) => Promise<ResponseDeleteMyBookTag>;
}

export interface MyBookTag {
  myBookId: number;
  myBookTagId: number;
  tag: string;
}

// CREATE MyBookTag에 대한 Type
export interface RequestPostMyBookTag {
  myBookId: number;
  tag: string;
}

export interface ResponsePostMyBookTag extends MyBookTag {}

// DELETE MyBookTag에 대한 Type
export interface RequestDeleteMyBookTag {
  myBookTagId: number;
}

export interface ResponseDeleteMyBookTag {
  myBookTagId: number;
  myBookId: number;
}
