import { Controller, useFormContext } from 'react-hook-form';

import {
  type AddMyBookHistoryType,
  MOOD_SELECTOR_OPTIONS,
} from '@/entities/my-book-history';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ChipSelector } from '@/shared/ui/chip-selector';
import { ErrorMessage } from '@/shared/ui/error-message';

export function AddMyBookHistoryMoodCard() {
  const { control } = useFormContext<AddMyBookHistoryType>();
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>
              독서 감정 기록<span className="ml-2 text-red-500">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChipSelector
              options={MOOD_SELECTOR_OPTIONS}
              value={value}
              onChange={onChange}
            />
          </CardContent>
          <CardFooter>
            {error?.message && (
              <ErrorMessage className="mr-auto">
                {String(error.message)}
              </ErrorMessage>
            )}
          </CardFooter>
        </Card>
      )}
    />
  );
}
