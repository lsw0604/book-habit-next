import { DEFAULT_FILTER_MY_BOOK, filterMyBookSchema } from '../schema';
import type { FilterMyBookType } from '../schema';

export interface RawFilterMyBookParams {
  order?: string | null;
  status?: string | null;
}

/**
 * 서버 컴포넌트(searchParams)와 클라이언트 훅(useSearchParams)이 반드시 같은 규칙으로 파싱해야
 * SSR prefetch가 만든 쿼리 키와 클라이언트가 조회하는 쿼리 키가 일치한다.
 * 한쪽이라도 다르면 hydration된 캐시를 못 찾고 다시 요청한다.
 */
export const parseFilterMyBookParams = (
  raw: RawFilterMyBookParams
): FilterMyBookType => {
  const result = filterMyBookSchema.safeParse({
    order: raw.order,
    status: raw.status || 'ALL',
  });

  return result.success ? result.data : DEFAULT_FILTER_MY_BOOK;
};
