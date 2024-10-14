type ResponseGetMyBookCommentList = {
  myBookCommentList: MyBookCommentListType
};

type MyBookCommentListType = MyBookCommentItemType[];

type MyBookCommentItemType = {
  commentId: number;
  isPublic: boolean;
  comment: string;
  createdAt: string;
  updatedAt: string;
  commentLikeCount: number;
  commentReplyCount: number;
}

type RequestMyBookCommentList = {
  myBookId: number;
};
