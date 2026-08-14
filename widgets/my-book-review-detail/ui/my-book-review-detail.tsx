'use client';

import { useModal } from '@/entities/modal';
import {
  MyBookReviewCard,
  useMyBookReview,
  type SerializedMyBookReview,
} from '@/entities/my-book-review';

import { MyBookReviewDetailEmpty } from './my-book-review-detail-empty';
import { MyBookReviewDetailLoader } from './my-book-review-detail-loader';

export function MyBookReviewDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBookReview(myBookId);
  const { open } = useModal();

  const onClickAdd = () => open('ADD_MY_BOOK_REVIEW', { myBookId });
  const onClickView = (selectedReview: SerializedMyBookReview) =>
    open('VIEW_MY_BOOK_REVIEW', { selectedReview });

  const renderContent = () => {
    if (isLoading) return <MyBookReviewDetailLoader />;
    // 리뷰가 없으면 data는 null이다 (undefined = 아직 안 옴)
    if (!data) return <MyBookReviewDetailEmpty onClick={onClickAdd} />;
    return <MyBookReviewCard myBookReview={data} onClick={onClickView} />;
  };

  return (
    <div className="px-2 pt-4 mt-4">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center pb-2 px-2">
        <h3 className="text-base font-bold hover:underline">나의 한줄평</h3>
      </div>

      {/* 본문 영역 */}
      {renderContent()}
    </div>
  );
}
