type PublicCommentItem = {
  commentId: number;
  comment: string;
  user: {
    id: number;
    name: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
  };
  book: {
    title: string;
  };
  commentLikes: { userId: number }[];
  commentReplyCount: number;
  createdAt: string;
  updatedAt: string;
};

type ResponseGetPublicCommentList = {
  nextPage?: number;
  comments: PublicCommentItem[];
};

type RequestGetPublicCommentList = {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
};
