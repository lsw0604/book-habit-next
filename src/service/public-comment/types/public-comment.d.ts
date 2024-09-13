type PublicCommentItem = {
  id: number;
  comment?: string;
  'myBook.book.title'?: string;
  'myBook.user.id': number;
  'myBook.user.name': string;
  'myBook.user.email': string;
  'myBook.user.gender': 'MALE' | 'FEMALE';
  commentLike: { userId: number }[];
  '_count.commentReply': number;
};

type ResponseGetPublicCommentList = {
  nextPage?: number;
  comments: PublicCommentItem[];
};

type RequestGetPublicCommentList = {
  page?: string;
  page_size?: string;
  start_date?: string;
  end_date?: string;
};
