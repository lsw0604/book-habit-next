import { useFormContext } from 'react-hook-form';

import { AddMyBookReviewType } from '@/entities/my-book-review';
import { Button } from '@/shared/ui/button';

export function AddMyBookReviewButtons() {
  const {
    formState: { isSubmitting },
  } = useFormContext<AddMyBookReviewType>();
  return (
    <div className="mt-auto p-4">
      <Button
        key="submit-btn"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        등록하기
      </Button>
    </div>
  );
}
