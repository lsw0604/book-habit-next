'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import SearchPopover from './search-popover';
import { Input } from '@/components/ui/input';

import { useSearchFormHook } from '@/hooks/search/useSearchFormHook';
import { SearchType } from '@/schemas/search.schema';

/**
 * TODO useForm이 사용가능한지 알아보기
 */
export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [size, setSize] = useState<number[]>([
    Number(searchParams.get('size') || 10),
  ]);
  const [target, setTarget] = useState<string>(
    searchParams.get('target') || 'title'
  );
  const [sort, setSort] = useState<string>(
    searchParams.get('sort') || 'accuracy'
  );

  const { handleSubmit, register, formState } = useSearchFormHook();
  const { errors } = formState;

  const onSubmit = (data: SearchType) => {
    router.push(
      `?query${data.query}&size=${size[0]}&sort=${sort}&target=${target}`
    );
  };

  useEffect(() => {
    setSize([Number(searchParams.get('size') || 10)]);
  }, [searchParams.get('size')]);

  useEffect(() => {
    setTarget(searchParams.get('target') || 'title');
  }, [searchParams.get('target')]);

  useEffect(() => {
    setSort(searchParams.get('sort') || 'accuracy');
  }, [searchParams.get('sort')]);

  return (
    <form
      className="w-full flex px-4 relative gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <Input
          className="rounded-full"
          isValid={!!errors}
          errorMessage={errors.query?.message}
          {...register('query')}
        />
      </div>
      <SearchPopover
        size={size}
        setSize={setSize}
        target={target}
        setTarget={setTarget}
        sort={sort}
        setSort={setSort}
      />
    </form>
  );
}
