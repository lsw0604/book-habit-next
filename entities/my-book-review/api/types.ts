export interface MyBookReviewService {
  addMyBookReview: (
    payload: CreateMyBookReviewPayload
  ) => Promise<MyBookReview>;
  getMyBookReview: (myBookId: number) => Promise<MyBookReview>;
  updateMyBookReview: (
    payload: UpdateMyBookReviewPayload
  ) => Promise<MyBookReview>;
  deleteMyBookReview: (
    myBookReviewId: number
  ) => Promise<ResponseDeleteMyBookReview>;
}

export interface MyBookReview {
  id: number;
  myBookId: number;
  review: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    reviewLike: number;
    reviewComment: number;
  };
}

export interface CreateMyBookReviewPayload {
  myBookId: number;
  isPublic: boolean;
  review: string;
}

export interface UpdateMyBookReviewPayload {
  myBookReviewId: number;
  isPublic?: boolean;
  review?: string;
}

export interface ResponseDeleteMyBookReview {
  myBookReviewId: number;
}
