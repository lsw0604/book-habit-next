import { useSearchParams } from 'next/navigation';
import { MyBookParamsType } from '@/schemas/my-book-params';

export default function useMyBookParams(): MyBookParamsType {
  const searchParams = useSearchParams();

  const order = (searchParams.get('order') as MyBookOrderType) || 'desc';
  const status = (searchParams.get('status') as MyBookStatusType) || 'ALL';

  return {
    order,
    status,
  };
}
