import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import Select from '@/shared/ui/select';

import { getTargetLabel } from '../lib';
import {
  type BookSearchFormType,
  BOOK_SEARCH_FORM_SELECT_OPTIONS,
} from '../model';

export function BookSearchTargetField() {
  const { control } = useFormContext<BookSearchFormType>();

  return (
    <Controller
      name="target"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">검색 유형</Label>
          <Select.ErrorBoundary>
            <Select onChange={onChange} value={value}>
              <Select.Trigger>{getTargetLabel(value)}</Select.Trigger>
              <Select.Content>
                {BOOK_SEARCH_FORM_SELECT_OPTIONS.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
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
