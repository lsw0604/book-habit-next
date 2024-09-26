import { MyBookListSchemaType } from '@/schemas/my-book-list.schema';

export const myBookParam = (
  searchParams: URLSearchParams
): MyBookListSchemaType => {
  const order = (searchParams.get('order') as MyBookOrderType) || 'desc';
  const status = (searchParams.get('status') as MyBookStatusType) || 'ALL';

  return {
    order,
    status,
  };
};
