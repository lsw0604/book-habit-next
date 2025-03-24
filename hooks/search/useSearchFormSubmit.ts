import { useCallback } from 'react';
import { SearchParamsType } from '@/schemas/search/params';
import useSearchRouter from './useSearchRouter';

export default function useSearchFormSubmit(onFormSubmit: () => void) {
  const { pushToSearch } = useSearchRouter();

  const onSubmit = useCallback(
    (data: SearchParamsType) => {
      pushToSearch(data);
      onFormSubmit();
    },
    [pushToSearch, onFormSubmit]
  );

  return {
    onSubmit,
  };
}
