'use client';

import { AddMyBookReviewProps } from '@/entities/modal';

import { AddMyBookReviewForm } from './add-my-book-review-form';
import { AddMyBookReviewProvider } from './add-my-book-review-provider';

export function AddMyBookReviewModal({ myBookId }: AddMyBookReviewProps) {
  return (
    <AddMyBookReviewProvider myBookId={myBookId}>
      <AddMyBookReviewForm myBookId={myBookId} />
    </AddMyBookReviewProvider>
  );
}
