export interface MyBookCommentService {
  postMyBookComment: (
    payload: RequestPostMyBookComment
  ) => Promise<ResponsePostMyBookComment>;
  getMyBookComments: (
    payload: RequestGetMyBookComments
  ) => Promise<ResponseGetMyBookComments>;
  putMyBookComment: (
    payload: RequestUpdateMyBookComment
  ) => Promise<ResponseUpdateMyBookComment>;
  deleteMyBookComment: (
    payload: RequestDeleteMyBookComment
  ) => Promise<ResponseDeleteMyBookComment>;
}

export interface MyBookComment {
  id: number;
  myBookId: number;
  comment: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    commentLike: number;
    commentReply: number;
  };
  user: {
    name: string;
    profile: string;
  };
}

// CREATE MyBookComment에 대한 Type
export interface RequestPostMyBookComment {
  myBookId: number;
  comment: string;
  isPublic: boolean;
}

export interface ResponsePostMyBookComment extends MyBookComment {}

// READ MyBookComment에 대한 Type
export interface RequestGetMyBookComments {
  myBookId: number;
}

export interface ResponseGetMyBookComments {
  myBookComments: ResponsePostMyBookComment[];
}

// UPDATE MyBookComment에 대한 Type
export interface RequestUpdateMyBookComment {
  id: number;
  isPublic?: boolean;
  comment?: string;
}

export interface ResponseUpdateMyBookComment extends MyBookComment {}

// DELETE MyBookComment에 대한 Type
export interface RequestDeleteMyBookComment {
  myBookCommentId: number;
}

export interface ResponseDeleteMyBookComment extends MyBookComment {}
