'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useSearchForm from './useSearchForm';
import { SearchSchemaType } from '@/schemas/search.schema';
import { searchRouter } from '@/service/search/searchRouter';
import { searchParam } from '@/service/search/searchParam';

export const useSearchHook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formKey, setFormKey] = useState<number>(0);

  const { query, size, sort, target } = searchParam(searchParams);
  const { handleSubmit, control, setValue } = useSearchForm({
    query,
    size,
    sort,
    target,
  });

  const onSubmit = (data: SearchSchemaType) => {
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
