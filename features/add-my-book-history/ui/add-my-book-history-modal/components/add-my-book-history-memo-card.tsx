import { useFormContext, Controller } from 'react-hook-form';

import { AutoSizeTextarea } from '@/shared/ui/textarea';

import type { AddMyBookHistoryType } from '../../../schema';

export function AddMyBookHistoryMemoCard() {
  const { control } = useFormContext<AddMyBookHistoryType>();

  return (
    <Controller
      name="memo"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center">
            독서 메모 기록
          </h3>
          <div>
            <AutoSizeTextarea
              id="memo"
              placeholder="여기에 메모를 입력하세요..."
              minHeight={160}
              isError={!!error?.message}
              errorMessage={error?.message}
              {...field}
            />
          </div>
        </div>
      )}
    />
  );
}

