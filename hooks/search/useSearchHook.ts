'use client';

import { useCallback, useEffect, useRef } from 'react';

import useSearchForm from '@/hooks/search/useSearchForm';
import searchParams from '@/hooks/search/searchParams';
import { SEARCH_FIELDS } from '@/constant/search-filed';

type SearchFieldType = (typeof SEARCH_FIELDS)[number];

export const useSearchHook = () => {
  const params = searchParams();
  const { handleSubmit, control, setValue, formState } = useSearchForm({
    ...params,
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
    formState,
    control,
  };
};
