import { Controller, useFormContext } from 'react-hook-form';

import { AddMyBookReviewType } from '@/entities/my-book-review';
import { ErrorMessage } from '@/shared/ui/error-message';
import { LabelledSwitch } from '@/shared/ui/labelled-switch';
import { AutoSizeTextarea } from '@/shared/ui/textarea';

export function AddMyBookReviewFields() {
  const { control } = useFormContext<AddMyBookReviewType>();

  return (
    <div className="flex-grow space-y-8 overflow-y-auto scrollbar-none p-4">
      <Controller
        name="isPublic"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <LabelledSwitch
              label="한줄평 공개하기"
              description="체크 시 다른 사람들에게도 나의 한줄평을 공개합니다."
              checked={value}
              onCheckedChange={onChange}
              className="border-none p-0"
            />
            {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        )}
      />
      <Controller
        control={control}
        name="review"
        render={({ field, fieldState: { error } }) => (
          <AutoSizeTextarea
            id="review"
            placeholder="한줄평을 입력하세요..."
            minHeight={160}
            isError={!!error?.message}
            errorMessage={error?.message}
            {...field}
          />
        )}
      />
    </div>
  );
}
