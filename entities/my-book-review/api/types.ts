import { MyBookReviewDTO } from './my-book-review.dto';

export interface MyBookReviewService {
  addMyBookReview: (
    payload: CreateMyBookReviewPayload
  ) => Promise<MyBookReviewDTO>;
  getMyBookReview: (myBookId: number) => Promise<MyBookReviewDTO | null>;
  updateMyBookReview: (
    payload: UpdateMyBookReviewPayload
  ) => Promise<MyBookReviewDTO>;
  deleteMyBookReview: (
    myBookReviewId: number
  ) => Promise<ResponseDeleteMyBookReview>;
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
