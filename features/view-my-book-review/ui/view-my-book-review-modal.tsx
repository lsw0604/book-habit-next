import { type ViewMyBookReviewProps, useModal } from '@/entities/modal';
import {
  MyBookReviewStats,
  MyBookReviewText,
  MyBookReviewVisibilityBadge,
  deserializeMyBookReview,
} from '@/entities/my-book-review';
import { Button } from '@/shared/ui/button';
import { DateLabel } from '@/shared/ui/date-label';

export function ViewMyBookReviewModal({
  selectedReview,
}: ViewMyBookReviewProps) {
  const { open } = useModal();
  const myBookReview = deserializeMyBookReview(selectedReview);

  const openEditModal = () =>
    open('UPDATE_MY_BOOK_REVIEW', { myBookId: selectedReview.myBookId });
  const openDeleteModal = () =>
    open('DELETE_MY_BOOK_REVIEW', { selectedReview });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex-grow space-y-4 overflow-y-auto scrollbar-none">
        <div className="flex items-center justify-between">
          <MyBookReviewVisibilityBadge myBookReview={myBookReview} />
        </div>
        <div className="bg-muted border rounded-lg p-4 space-y-3">
          <MyBookReviewText myBookReview={myBookReview} variant="full" />
          <MyBookReviewStats myBookReview={myBookReview} />
        </div>
        <DateLabel date={myBookReview} />
      </div>
      <div className="flex gap-4 mt-auto">
        <Button
          key="edit-modal-btn"
          type="button"
          variant="default"
          onClick={openEditModal}
          className="flex-1"
        >
          수정하기
        </Button>
        <Button
          key="delete-modal-btn"
          variant="outline"
          type="button"
          onClick={openDeleteModal}
          className="flex-1 text-gray-700 border-gray-200 hover:bg-gray-100"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
