export interface PublicCommentService {
  getPublicComments: (
    params: RequestPublicComments
  ) => Promise<ResponsePublicComments>;
}

export interface PublicComment {
  commentId: number;
  comment: string;
  user: {
    id: number;
    name: string;
    email: string;
    gender: GenderType;
  };
  book: {
    title: string;
  };
  commentLikes: { userId: number }[];
  commentReplyCount: number;
  createdAt: string;
  updatedAt: string;
}

// READ PublicComment에 대한 Type
export interface ResponsePublicComments {
  nextPage?: number;
  comments: PublicComment[];
}

export interface RequestPublicComments {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
}
