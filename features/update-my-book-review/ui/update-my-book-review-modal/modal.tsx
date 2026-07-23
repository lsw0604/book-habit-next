'use client';

import type { UpdateMyBookReviewProps } from '@/entities/modal';

import { UpdateMyBookReviewModalForm } from './form';
import { UpdateMyBookReviewModalProvider } from './provider';

export function UpdateMyBookReviewModal({ myBookId }: UpdateMyBookReviewProps) {
  return (
    <UpdateMyBookReviewModalProvider myBookId={myBookId}>
      <UpdateMyBookReviewModalForm myBookId={myBookId} />
    </UpdateMyBookReviewModalProvider>
  );
}
