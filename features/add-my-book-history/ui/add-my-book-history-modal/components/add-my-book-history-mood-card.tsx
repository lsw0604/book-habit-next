import { Controller, useFormContext } from 'react-hook-form';

import { MOOD_SELECTOR_OPTIONS } from '@/entities/my-book-history';
import { ChipSelector } from '@/shared/ui/chip-selector';
import { ErrorMessage } from '@/shared/ui/error-message';

import type { AddMyBookHistoryType } from '../../../schema';

export function AddMyBookHistoryMoodCard() {
  const { control } = useFormContext<AddMyBookHistoryType>();
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center">
            독서 감정 기록<span className="ml-1 text-red-500">*</span>
          </h3>
          <div>
            <ChipSelector
              options={MOOD_SELECTOR_OPTIONS}
              value={value}
              onChange={onChange}
            />
          </div>
          {error?.message && (
            <ErrorMessage className="mr-auto">
              {String(error.message)}
            </ErrorMessage>
          )}
        </div>
      )}
    />
  );
}

