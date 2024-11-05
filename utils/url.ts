import { MyBookParamsSchemaType } from '@/hooks/form/my-book/schema/params.schema';
import { PublicCommentParamsSchemaType } from '@/hooks/form/public-comment/schema/params.schema';
import { SearchParamsSchemaType } from '@/hooks/form/search/schema/params.schema';

import dayjs from 'dayjs';

export const createMyBookUrl = (data: Partial<MyBookParamsSchemaType>) => {
  const searchParams = new URLSearchParams();
  if (data.status) searchParams.set('status', data.status);
  if (data.order) searchParams.set('order', data.order);
  return `/my_books?${searchParams.toString()}`;
};

export const createSearchUrl = (data: Partial<SearchParamsSchemaType>) => {
  const searchParams = new URLSearchParams();
  if (data.query) searchParams.set('query', data.query);
  if (data.size) searchParams.set('size', data.size.toString());
  if (data.sort) searchParams.set('sort', data.sort);
  if (data.target) searchParams.set('target', data.target);
  return `/search?${searchParams.toString()}`;
};

export const createPublicCommentUrl = (data: PublicCommentParamsSchemaType) => {
  const searchParams = new URLSearchParams();
  const startDate = dayjs(data.startDate).format('YYYYMMDD');
  const endDate = dayjs(data.endDate).format('YYYYMMDD');
  const pageSize = data.pageSize.toString();

  if (data.startDate) searchParams.set('start_date', startDate);
  if (data.endDate) searchParams.set('end_date', endDate);
  if (data.pageSize) searchParams.set('pageSize', pageSize);

  return `/comments?${searchParams.toString()}`;
};
