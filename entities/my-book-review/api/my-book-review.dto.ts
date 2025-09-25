export interface MyBookReviewDTO {
  id: number;
  myBookId: number;
  review: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    reviewLike: number;
    reviewComment: number;
  };
}
