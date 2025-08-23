import { Controller, useFormContext } from 'react-hook-form';

import { MOOD_SELECTOR_OPTIONS } from '@/entities/my-book-history/constants';
import { ChipSelector } from '@/shared/ui/chip-selector';
import { ErrorMessage } from '@/shared/ui/error-message';

import type { AddMyBookHistoryType } from '../../model/schema';

export default function AddMyBookHistoryMoodStep() {
  const { control } = useFormContext<AddMyBookHistoryType>();
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <div className="w-full h-auto my-2 px-4 py-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <ChipSelector
            options={MOOD_SELECTOR_OPTIONS}
            value={value}
            onChange={onChange}
          />
          {!!errors.readingMood?.message && (
            <ErrorMessage className="mt-2 text-center">
              {String(errors.readingMood.message)}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
