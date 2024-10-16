type RequestRegisterMyBookComment = {
  myBookId: number;
  comment: string;
  isPublic: boolean;
};

type ResponseRegisterMyBookComment = MyBookCommentItemType;
