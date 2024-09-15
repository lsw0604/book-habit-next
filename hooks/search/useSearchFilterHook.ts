import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function useSearchFilterHook() {
  const searchParams = useSearchParams();
  const [] = useState();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'accuracy';
  const target = searchParams.get('target') || 'title';
  const page = Number(searchParams.get('page') || 1);
  const size = Number(searchParams.get('size') || 10);

  const updateParams = (
    newParams: Record<string, string | number | undefined>
  ) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined) {
        updatedParams.set(key, String(value));
      } else {
        updatedParams.delete(key); // 값이 없으면 삭제
      }
    });
  };

  return {
    query,
    sort,
    page,
    size,
    target,
  };
}
