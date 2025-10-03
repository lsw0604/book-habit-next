'use client';

import { useMyBookReview } from '@/entities/my-book-review';
import { useApiStatus } from '@/shared/api/hooks';

interface MyBookReviewDetailProps {
  myBookId: number;
}

export function MyBookReviewDetail({ myBookId }: MyBookReviewDetailProps) {
  const { data, isLoading } = useMyBookReview(myBookId);
  const { isInitialized } = useApiStatus();

  if (!isInitialized || isLoading)
    return (
      <div className="px-2 pt-4 mt-4 border rounded-lg shadow-lg">
        Loading...
      </div>
    );
  if (!data || data === null)
    return (
      <div className="px-2 pt-4 mt-4 border rounded-lg shadow-lg">empty</div>
    );

  return (
    <div className="px-2 pt-4 mt-4 border rounded-lg shadow-lg">
      myBookReview
    </div>
  );
}
