import { ReadonlyURLSearchParams } from 'next/navigation';

export const parseParam = <T>(
  searchParams: ReadonlyURLSearchParams,
  key: string,
  parser: (value: string) => T,
  defaultValue: T
): T => {
  const value = searchParams.get(key);

  if (value === null) return defaultValue;

  try {
    return parser(value);
  } catch {
    return defaultValue;
  }
};
