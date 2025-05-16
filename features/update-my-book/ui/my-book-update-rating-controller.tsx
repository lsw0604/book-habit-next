import type { MyBookUpdateControllerProps } from '../model/types';
import { Controller } from 'react-hook-form';
import { Rating } from '@/shared/ui/rating';
import { ErrorMessage } from '@/shared/ui/error-message';

export default function MyBookUpdateRatingController({
  control,
}: MyBookUpdateControllerProps) {
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
