import { Controller } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import Select from '@/shared/ui/select';

import type { BookSearchControllerProps } from '../../model/types';

export default function BookSearchTargetController({
  control,
}: BookSearchControllerProps) {
  return (
    <Controller
      name="target"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">검색 유형</Label>
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>
                {value === 'title' && '제목'}
                {value === 'isbn' && 'ISBN'}
                {value === 'person' && '작가'}
                {value === 'publisher' && '출판사'}
              </Select.Trigger>
              <Select.Content>
                <Select.Option value="title">제목</Select.Option>
                <Select.Option value="isbn">ISBN</Select.Option>
                <Select.Option value="person">작가</Select.Option>
                <Select.Option value="publisher">출판사</Select.Option>
              </Select.Content>
            </Select>
          </Select.ErrorBoundary>
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
