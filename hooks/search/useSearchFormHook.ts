'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SearchType } from '@/schemas/search.schema';
import { searchRouter } from '@/domain/search/search-router';
import { getSearchParams } from '@/domain/search/get-search-params';

export const useSearchFormHook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formKey, setFormKey] = useState<number>(0);

  const { query, size, sort, target } = getSearchParams(searchParams);
  const { handleSubmit, control, setValue } = useForm<SearchType>({
    defaultValues: {
      query,
      size,
      sort,
      target,
    },
  });

  const onSubmit = (data: SearchType) => {
    try {
      searchRouter(router, data);
      setFormKey((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setValue('query', query);
    setValue('size', size);
    setValue('target', target);
    setValue('sort', sort);
  }, [query, size, sort, target, setValue]);

  return {
    handleSubmit,
    control,
    formKey,
    onSubmit,
  };
};
