import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { BookSearchParamsType } from '@/features/book-search/model/schema';

export function useBookSearchFormSubmit(setIsRouting: (v: boolean) => void) {
  const router = useRouter();

  const onSubmit = useCallback(
    (data: BookSearchParamsType) => {
      // 함수 내부에서 searchParams 초기화
      const searchParams = new URLSearchParams();

      // 값이 있는 파라미터만 URL에 추가
      if (data.query) searchParams.set('query', data.query);
      if (data.size) searchParams.set('size', data.size.toString());
      if (data.sort) searchParams.set('sort', data.sort);
      if (data.target) searchParams.set('target', data.target);

      // 폼 제출 후 콜백 실행
      setIsRouting(true);
      router.push(`/search?${searchParams.toString()}`);
      // 추후에 useEffect에서 setIsRouting(false)로 자동 전환 가능
    },
    [router, setIsRouting]
  ); // router를 의존성에 포함

  return {
    onSubmit,
  };
}
