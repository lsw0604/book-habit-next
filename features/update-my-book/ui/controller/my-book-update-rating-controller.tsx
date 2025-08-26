import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Rating } from '@/shared/ui/rating';

import type { UpdateMyBookType } from '../../schemas';

export function MyBookUpdateRatingController() {
  const { control } = useFormContext<UpdateMyBookType>();
  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <Rating rating={value as number} onChange={onChange} />
          {!!errors?.rating?.message && (
            <ErrorMessage>{errors.rating.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
}
