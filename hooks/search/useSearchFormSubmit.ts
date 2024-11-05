import { useCallback } from 'react';
import { SearchParamsSchemaType } from '../form/search/schema/params.schema';
import useSearchRouter from './useSearchRouter';

export default function useSearchFormSubmit(onFormSubmit: () => void) {
  const { pushToSearch } = useSearchRouter();

  const onSubmit = useCallback(
    (data: SearchParamsSchemaType) => {
      pushToSearch(data);
      onFormSubmit();
    },
    [pushToSearch, onFormSubmit]
  );

  return {
    onSubmit,
  };
}
