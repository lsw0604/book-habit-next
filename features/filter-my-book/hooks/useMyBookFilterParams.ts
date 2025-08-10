import { useSearchParams } from 'next/navigation';

import { FilterMyBookOrder, FilterMyBookStatus } from '../model';

export const useMyBookFilterParams = () => {
  const searchParams = useSearchParams();

  const order: FilterMyBookOrder =
    (searchParams.get('order') as FilterMyBookOrder) || 'desc';
  const status: FilterMyBookStatus =
    (searchParams.get('status') as FilterMyBookStatus) || 'ALL';

  return {
    order,
    status,
  };
};
