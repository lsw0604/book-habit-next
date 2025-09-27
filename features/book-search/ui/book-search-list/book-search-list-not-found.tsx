'use client';

import { Button } from '@/shared/ui/button';
import { ErrorMessage } from '@/shared/ui/error-message';

interface BookSearchListNotFoundProps {
  query?: string;
  isError?: boolean;
  errorMessage?: string;
  refetch?: () => void;
}

export function BookSearchListNotFound({
  errorMessage,
  isError,
  query,
  refetch,
}: BookSearchListNotFoundProps) {
  return (
    <div className="w-full h-full p-4 pt-0">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center text-slate-500 text-lg">
        {!query ? (
          <span className="flex">찾고싶은 내용을 검색해주세요.</span>
        ) : (
          <h1 className="px-10 pb-10">
            <span className="text-slate-600 font-bold text-lg mr-2">
              {query}
            </span>
            에 대한 검색결과가 없습니다.
            {isError && (
              <ErrorMessage className="text-center">
                {errorMessage}
              </ErrorMessage>
            )}
            {isError && (
              <Button onClick={refetch} variant="ghost">
                재시도
              </Button>
            )}
          </h1>
        )}
      </div>
    </div>
  );
}
