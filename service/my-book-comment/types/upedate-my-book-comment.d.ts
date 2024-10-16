type RequestUpdateMyBookComment = {
  myBookId: number;
  isPublic?: boolean;
  comment?: boolean;
};

type ResponseUpdateMyBookComment = MyBookCommentItemType;
