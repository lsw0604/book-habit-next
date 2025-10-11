import { BookSearchParamsType } from '../schemas';

export const buildBookSearchURL = (data: BookSearchParamsType): string => {
  const searchParams = new URLSearchParams();

  if (data.query) searchParams.set('query', data.query);
  if (data.size) searchParams.set('size', data.size.toString());
  if (data.sort) searchParams.set('sort', data.sort);
  if (data.target) searchParams.set('target', data.target);

  return `/search?${searchParams.toString()}`;
};
