import { useFormContext, Controller } from 'react-hook-form';

import type { EditMyBookHistoryType } from '@/entities/my-book-history';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/shared/ui/card';
import { AutoSizeTextarea } from '@/shared/ui/textarea';

export function EditMyBookHistoryMemoCard() {
  const { control } = useFormContext<EditMyBookHistoryType>();

  return (
    <Controller
      name="memo"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>독서 메모 수정</CardTitle>
            <CardDescription>선택 사항</CardDescription>
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
