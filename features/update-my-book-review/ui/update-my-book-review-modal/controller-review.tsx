import { Controller, useFormContext } from 'react-hook-form';

import { AutoSizeTextarea } from '@/shared/ui/textarea';

import type { UpdateMyBookReviewType } from '../../schema';

export function UpdateMyBookReviewControllerReview() {
  const { control } = useFormContext<UpdateMyBookReviewType>();

  return (
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
  );
}
