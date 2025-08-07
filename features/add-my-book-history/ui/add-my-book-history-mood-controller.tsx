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
        <div className="w-full h-auto my-2 p-4 rounded-lg border-none shadow-lg flex items-center justify-center hover:shadow-2xl bg-white/50 backdrop-blur-sm transition-shadow duration-200">
          <div className="relative w-full mb-2">
            <Label className="mb-2 ml-2 text-sm font-bold">
              당시 감정을 선택해주세요.
            </Label>
            <MoodSelector value={value} onChange={onChange} />
            {!!errors.readingMinutes?.message && (
              <ErrorMessage>{errors.readingMinutes.message}</ErrorMessage>
            )}
          </div>
        </div>
      )}
    />
  );
}
