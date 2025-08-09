import { Controller } from 'react-hook-form';

import { MoodSelector } from '@/entities/my-book-history/ui';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';

import type { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryMoodController({
  control,
}: AddMyBookHistoryControllerProps) {
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full">
            <Label className="text-lg font-semibold text-gray-800 mb-4 block text-center">
              어떤 감정으로 책을 읽으셨나요?
            </Label>
            <MoodSelector value={value} onChange={onChange} />
            {!!errors.readingMood?.message && (
              <ErrorMessage className="mt-2 text-center">
                {errors.readingMood.message}
              </ErrorMessage>
            )}
          </div>
        </div>
      )}
    />
  );
}
