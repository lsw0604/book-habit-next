type RequestUpdateMyBookComment = {
  id: number;
  isPublic?: boolean;
  comment?: string;
};

type ResponseUpdateMyBookComment = MyBookCommentItemType;
