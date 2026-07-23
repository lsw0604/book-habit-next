'use client';

import { AddMyBookReviewProps } from '@/entities/modal';

import { AddMyBookReviewModalForm } from './form';
import { AddMyBookReviewModalProvider } from './provider';

export function AddMyBookReviewModal({ myBookId, isbn }: AddMyBookReviewProps) {
  return (
    <AddMyBookReviewModalProvider myBookId={myBookId}>
      <AddMyBookReviewModalForm myBookId={myBookId} isbn={isbn} />
    </AddMyBookReviewModalProvider>
  );
}
