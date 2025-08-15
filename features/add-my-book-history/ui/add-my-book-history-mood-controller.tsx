import { Controller } from 'react-hook-form';

import { MoodSelector } from '@/entities/my-book-history/ui';
import { ErrorMessage } from '@/shared/ui/error-message';

import type { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryMoodController({
  control,
}: AddMyBookHistoryControllerProps) {
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <MoodSelector value={value} onChange={onChange} />
          {!!errors.readingMood?.message && (
            <ErrorMessage className="mt-2 text-center">
              {errors.readingMood.message}
            </ErrorMessage>
          )}
        </>
      )}
    />
  );
}
