import { useSearchParams } from 'next/navigation';
import { MyBookListSchemaType } from '@/schemas/my-book-list.schema';

export default function useMyBookParams(): MyBookListSchemaType {
  const searchParams = useSearchParams();

  const order = (searchParams.get('order') as MyBookOrderType) || 'desc';
  const status = (searchParams.get('status') as MyBookStatusType) || 'ALL';

  return {
    order,
    status,
  };
}
