'use client';

import { useModal } from '@/entities/modal';
import { useMyBookReview } from '@/entities/my-book-review';
import { useApiStatus } from '@/shared/api/hooks';
import { createMarkUp } from '@/shared/utils';

import { MyBookReviewDetailEmpty } from './my-book-review-detail-empty';
import { MyBookReviewDetailLoader } from './my-book-review-detail-loader';

export function MyBookReviewDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBookReview(myBookId);
  const { isInitialized } = useApiStatus();
  const { open } = useModal();

  const onClickEmpty = () => open('ADD_MY_BOOK_REVIEW', { myBookId });

  if (!isInitialized || isLoading) return <MyBookReviewDetailLoader />;
  if (!data || data === null)
    return <MyBookReviewDetailEmpty onClick={onClickEmpty} />;

  return (
    <div className="pt-7 pb-8 border rounded-lg shadow-lg">
      <div className="px-8">
        <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">
          {data.review}
        </p>
      </div>
    </div>
  );
}
