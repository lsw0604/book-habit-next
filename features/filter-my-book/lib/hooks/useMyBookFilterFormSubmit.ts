import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { MyBookParamsType } from '@/entities/my-book/model/schema';

export function useMyBookFilterFormSubmit() {
  const router = useRouter();

  const onSubmit = useCallback(
    (data: MyBookParamsType) => {
      const searchParams = new URLSearchParams();
      if (data.status) searchParams.set('status', data.status);
      if (data.order) searchParams.set('order', data.order);
      router.push(`/my_books?${searchParams.toString()}`);
    },
    [router]
  );

  return {
    onSubmit,
  };
}
