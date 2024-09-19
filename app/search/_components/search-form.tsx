'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SearchPopover from './search-popover';
import { Input } from '@/components/ui/input';

import { useSearchFormHook } from '@/hooks/search/useSearchFormHook';
import { SearchType } from '@/schemas/search.schema';
import { Controller } from 'react-hook-form';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const size = Number(searchParams.get('size') || 10);
  const sort = (searchParams.get('sort') as SearchType['sort']) || 'accuracy';
  const target =
    (searchParams.get('target') as SearchType['target']) || 'title';

  const { handleSubmit, control, setValue } = useSearchFormHook();

  const onSubmit = (data: SearchType) => {
    router.push(
      `?query=${data.query}&size=${data.size}&sort=${data.sort}&target=${data.target}`
    );
  };

  useEffect(() => {
    setValue('query', query);
    setValue('size', size);
    setValue('target', target);
    setValue('sort', sort);
  }, [searchParams, setValue]);

  return (
    <form
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
              isValid={!error}
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <SearchPopover control={control} />
    </form>
  );
}
