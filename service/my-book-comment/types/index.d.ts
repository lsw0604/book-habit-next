type MyBookCommentItemType = {
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
};
