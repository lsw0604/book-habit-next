import { useSearchParams } from 'next/navigation';
import { MyBookOrder, MyBookStatus } from '@/entities/my-book/model';

export const useMyBookFilterParams = () => {
  const searchParams = useSearchParams();

  const order: MyBookOrder =
    (searchParams.get('order') as MyBookOrder) || 'desc';
  const status: MyBookStatus =
    (searchParams.get('status') as MyBookStatus) || 'ALL';

  return {
    order,
    status,
  };
};
