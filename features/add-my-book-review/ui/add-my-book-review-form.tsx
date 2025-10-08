import { Controller, useFormContext } from 'react-hook-form';

import { closeModal } from '@/entities/modal';
import {
  AddMyBookReviewType,
  useAddMyBookReview,
} from '@/entities/my-book-review';
import { useAppDispatch } from '@/shared/redux';
import { Button } from '@/shared/ui/button';
import { AutoSizeTextarea } from '@/shared/ui/textarea';

interface AddMyBookReviewFormProps {
  myBookId: number;
}

export function AddMyBookReviewForm({ myBookId }: AddMyBookReviewFormProps) {
  const dispatch = useAppDispatch();
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useFormContext<AddMyBookReviewType>();

  const { mutate } = useAddMyBookReview({ myBookId });

  const onSubmit = (data: AddMyBookReviewType) => {
    mutate(data, {
      onSuccess: () => dispatch(closeModal()),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow h-full"
    >
      <div className="flex-grow space-y-4 overflow-y-auto scrollbar-none p-4">
        <Controller
          control={control}
          name="review"
          render={({ field, fieldState: { error } }) => (
            <AutoSizeTextarea
              id="review"
              placeholder="한줄평을 입력하세요..."
              minHeight={160}
              isError={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className="mt-auto p-4">
        <Button
          key="submit-btn"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
