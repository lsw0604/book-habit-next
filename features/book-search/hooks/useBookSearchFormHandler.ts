import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

import { BOOK_SEARCH_FIELDS, BookSearchFieldType } from '../constant';

import { useBookSearchForm } from './useBookSearchForm';
import { useBookSearchParams } from './useBookSearchParams';

export const useBookSearchFormHandler = () => {
  const params = useBookSearchParams();
  const { handleSubmit, control, setValue, formState, ...methods } =
    useBookSearchForm({ ...params });

  const [isRouting, setIsRouting] = useState<boolean>(false);

  const previousQuery = useRef(params.query);
  const previousSize = useRef(params.size);
  const previousSort = useRef(params.sort);
  const previousTarget = useRef(params.target);

  const previousParams = useMemo(
    () => ({
      query: previousQuery,
      size: previousSize,
      sort: previousSort,
      target: previousTarget,
    }),
    [previousQuery, previousSize, previousSort, previousTarget]
  );

  const updateFormValue = useCallback(() => {
    BOOK_SEARCH_FIELDS.forEach((field: BookSearchFieldType) => {
      if (params[field] !== previousParams[field].current) {
        setValue(field, params[field]);
        previousParams[field].current = params[field];
      }
    });
  }, [params, setValue, previousParams]);

  useEffect(() => {
    if (!isRouting) updateFormValue();
  }, [isRouting, updateFormValue]);

  return {
    handleSubmit,
    formState,
    control,
    setIsRouting,
    ...methods,
  };
};
