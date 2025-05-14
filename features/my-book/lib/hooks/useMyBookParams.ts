import { useSearchParams } from 'next/navigation';
import { MyBookOrder, MyBookStatus } from '@/entities/my-book/model';

export const useMyBookParams = () => {
  const searchParams = useSearchParams();

  const order = (searchParams.get('order') as MyBookOrder) || 'desc';
  const status = (searchParams.get('status') as MyBookStatus) || 'ALL';

  return {
    order,
    status,
  };
};
