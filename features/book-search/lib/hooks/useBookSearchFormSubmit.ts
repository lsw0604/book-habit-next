import type { BookSearchParamsType } from '@/features/book-search/model/schema';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function useBookSearchFormSubmit(onFormSubmit: () => void) {
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

      // URL로 이동
      router.push(`/search?${searchParams.toString()}`);

      // 폼 제출 후 콜백 실행
      onFormSubmit();
    },
    [router, onFormSubmit] // router를 의존성에 포함
  );

  return {
    onSubmit,
  };
}
