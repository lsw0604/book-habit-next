'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import useSearchForm from '@/hooks/search/useSearchForm';
import searchParams from '@/hooks/search/searchParams';
import useSearchRouter from '@/hooks/search/useSearchRouter';
import { SearchSchemaType } from '@/schemas/search.schema';
import { SEARCH_FIELDS } from '@/constant/search-filed';

type SearchFieldType = (typeof SEARCH_FIELDS)[number];

export const useSearchHook = () => {
  const [formKey, setFormKey] = useState<number>(0);
  const params = searchParams();
  const { pushToSearch } = useSearchRouter();
  const { handleSubmit, control, setValue, formState } = useSearchForm({
    query: params.query,
    size: params.size,
    sort: params.sort,
    target: params.target,
  });

  const previousQuery = useRef(params.query);
  const previousSize = useRef(params.size);
  const previousSort = useRef(params.sort);
  const previousTarget = useRef(params.target);

  const previousParams = {
    query: previousQuery,
    size: previousSize,
    sort: previousSort,
    target: previousTarget,
  };

  const onSubmit = useCallback(
    (data: SearchSchemaType) => {
      try {
        pushToSearch(data);
        setFormKey((prev) => prev + 1);
      } catch (err) {
        console.log(err);
      }
    },
    [pushToSearch, setFormKey]
  );

  const updateFormValue = useCallback(() => {
    SEARCH_FIELDS.forEach((field: SearchFieldType) => {
      if (params[field] !== previousParams[field].current) {
        setValue(field, params[field]);
        previousParams[field].current = params[field];
      }
    });
  }, [params, setValue]);

  useEffect(() => {
    updateFormValue();
  }, [params, updateFormValue]);

  return {
    handleSubmit,
    control,
    formKey,
    onSubmit,
    formState,
  };
};
