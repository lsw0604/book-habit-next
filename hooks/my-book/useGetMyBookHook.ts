'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import useGetMyBookForm from '@/hooks/my-book/useGetMyBookForm';
import { MyBookListSchemaType } from '@/schemas/my-book-list.schema';
import { myBookRouter } from '@/service/my-book/myBookRouter';

export default function useGetMyBookHook() {
  const router = useRouter();
  const { control, watch } = useGetMyBookForm();

  const debouncedMyBookRouter = useDebounceCallback(
    (data: MyBookListSchemaType) => {
      myBookRouter(router, data);
    },
    300
  );

  useEffect(() => {
    const subscription = watch((data) => {
      debouncedMyBookRouter(data as MyBookListSchemaType);
    });

    return () => subscription.unsubscribe();
  }, [watch, debouncedMyBookRouter]);

  return {
    control,
  };
}
