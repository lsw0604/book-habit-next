'use client';

import { useEffect, useState } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';
import { Spinner } from '@/shared/ui/spinner';

const SKELETON_DELAY_MS = 150; // 스켈레톤이 나타나기 전 지연 시간 (ms)

export function ModalLoader() {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(true);
    }, SKELETON_DELAY_MS);

    return () => clearTimeout(timer); // 타이머 정리
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {showSkeleton ? (
        <div className="flex flex-col p-4 space-y-4 w-full max-w-md bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
          <div className="flex justify-end space-x-2">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
