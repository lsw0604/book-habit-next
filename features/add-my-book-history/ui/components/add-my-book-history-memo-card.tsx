import { useFormContext, Controller } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { AutoSizeTextarea } from '@/shared/ui/textarea';

import type { AddMyBookHistoryType } from '../../schemas';

export function AddMyBookHistoryMemoCard() {
  const { control } = useFormContext<AddMyBookHistoryType>();

  return (
    <Controller
      name="memo"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>독서 메모 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <AutoSizeTextarea
              id="memo"
              placeholder="여기에 메모를 입력하세요..."
              minHeight={160}
              isError={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          </CardContent>
        </Card>
      )}
    />
  );
}
