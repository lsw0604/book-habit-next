'use client';

import { Control, Controller } from 'react-hook-form';
import { useCallback, useState } from 'react';

import SearchPopover from './search-popover';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/common/error-message';
import useSearchFormSubmit from '@/hooks/search/useSearchFormSubmit';
import { useSearchFormHandler } from '@/hooks/search/useSearchFormHandler';
import { SearchSchemaType } from '@/schemas/search.schema';
import { cn } from '@/utils/class-name';

interface ControllerProps {
  control: Control<SearchSchemaType>;
}

export default function SearchForm() {
  const [formKey, setFormKey] = useState<number>(0);
  const { handleSubmit, control, formState } = useSearchFormHandler();

  const onFormSubmit = useCallback(() => {
    setFormKey((prev) => prev++);
  }, []);

  const { onSubmit } = useSearchFormSubmit(onFormSubmit);

  return (
    <form
      key={formKey}
      className={cn(
        'w-full flex p-4 relative gap-2 min-w-[240px] max-w-96', // 기본 스타일
        'border-gray-300 border-b shadow-sm rounded-lg' // 테두리 스타일
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchInputController control={control} />
      <SearchPopover control={control} formState={formState} />
    </form>
  );
}

const SearchInputController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="query"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Input
            {...field}
            className="rounded-full"
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
