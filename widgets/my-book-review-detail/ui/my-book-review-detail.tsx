'use client';

import { useModal } from '@/entities/modal';
import {
  MyBookReviewCard,
  useMyBookReview,
  type SerializedMyBookReview,
} from '@/entities/my-book-review';
import { useApiStatus } from '@/shared/api';

import { MyBookReviewDetailEmpty } from './my-book-review-detail-empty';
import { MyBookReviewDetailLoader } from './my-book-review-detail-loader';

export function MyBookReviewDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBookReview(myBookId);
  const { isInitialized } = useApiStatus();
  const { open } = useModal();

  const onClickAdd = () => open('ADD_MY_BOOK_REVIEW', { myBookId });
  const onClickView = (selectedReview: SerializedMyBookReview) =>
    open('VIEW_MY_BOOK_REVIEW', { selectedReview });

  /**
   * SSR로 hydration된 캐시가 있으면 data가 이미 채워져 있다(리뷰 없음은 null).
   * 이때는 ApiProvider 초기화를 기다릴 이유가 없으므로 곧바로 렌더한다.
   */
  const isShowLoader = data === undefined && (!isInitialized || isLoading);

  const renderContent = () => {
    if (isShowLoader) return <MyBookReviewDetailLoader />;
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
