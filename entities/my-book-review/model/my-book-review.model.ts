import { MyBookReviewDTO } from '../api';

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

export interface SerializedMyBookReview extends MyBookReviewDTO {}
