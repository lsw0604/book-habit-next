'use client';

import { Controller } from 'react-hook-form';

import SearchPopover from './search-popover';
import { Input } from '@/components/ui/input';
import { useSearchHook } from '@/hooks/search/useSearchHook';

export default function SearchForm() {
  const { handleSubmit, control, formKey, onSubmit } = useSearchHook();

  return (
    <form
      key={formKey}
      className="w-full flex px-4 relative gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <Controller
          name="query"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              className="rounded-full"
              isValid={!!error}
              errorMessage={error?.message}
              useValidation
            />
          )}
        />
      </div>
      <SearchPopover control={control} />
    </form>
  );
}
