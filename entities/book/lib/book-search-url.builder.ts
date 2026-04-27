import type { BookSearchParams } from '../model';

export const buildBookSearchURL = (data: Partial<BookSearchParams>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(data).reduce((acc, [key, value]) => {
    if (value) {
      acc.set(key, value.toString());
    }

    return acc;
  }, searchParams);

  return `/search?${searchParams.toString()}`;
};
