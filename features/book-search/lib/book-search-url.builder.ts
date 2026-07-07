import { BookSearchParams } from "../model";

export function bookSearchUrlBuilder(data: BookSearchParams) {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    params.set(key, value.toString());
  });

  return `/search?${params.toString()}`;
}