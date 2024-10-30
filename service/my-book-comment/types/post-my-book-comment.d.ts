type RequestPostMyBookComment = {
  myBookId: number;
  comment: string;
  isPublic: boolean;
};

type ResponsePostMyBookComment = MyBookCommentItemType;
