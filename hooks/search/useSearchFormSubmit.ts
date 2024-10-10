import { SearchSchemaType } from '@/schemas/search.schema';
import { useCallback } from 'react';
import useSearchRouter from '@/hooks/search/useSearchRouter';

export default function useSearchFormSubmit(onFormSubmit: () => void) {
  const { pushToSearch } = useSearchRouter();

  const onSubmit = useCallback(
    (data: SearchSchemaType) => {
      pushToSearch(data);
      onFormSubmit();
    },
    [pushToSearch, onFormSubmit]
  );

  return {
    onSubmit,
  };
}
