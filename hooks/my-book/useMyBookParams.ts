import { useSearchParams } from 'next/navigation';
import { MyBookParamsSchemaType } from '../form/my-book/schema/params.schema';

export default function useMyBookParams(): MyBookParamsSchemaType {
  const searchParams = useSearchParams();

  const order = (searchParams.get('order') as MyBookOrderType) || 'desc';
  const status = (searchParams.get('status') as MyBookStatusType) || 'ALL';

  return {
    order,
    status,
  };
}
