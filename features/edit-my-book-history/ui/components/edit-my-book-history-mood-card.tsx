import { Controller, useFormContext } from 'react-hook-form';

import {
  type EditMyBookHistoryType,
  MOOD_SELECTOR_OPTIONS,
} from '@/entities/my-book-history';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ChipSelector } from '@/shared/ui/chip-selector';
import { ErrorMessage } from '@/shared/ui/error-message';

export function EditMyBookHistoryMoodCard() {
  const { control } = useFormContext<EditMyBookHistoryType>();
  return (
    <Controller
      name="readingMood"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>독서 감정 수정</CardTitle>
            <CardDescription>선택 사항</CardDescription>
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
