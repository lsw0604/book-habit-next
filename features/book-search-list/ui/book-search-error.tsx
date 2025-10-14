import { isAxiosError, AxiosError } from 'axios';
import { AlertCircle, RotateCw } from 'lucide-react';

import { Button } from '@/shared/ui/button';

interface BookSearchErrorProps {
  error: Error | AxiosError;
  onRetry?: () => void;
}

const getErrorMessage = (error: Error | AxiosError) => {
  if (isAxiosError(error)) {
    if (error.response) {
      return {
        main: '요청을 처리하는 중 문제가 발생했습니다.',
        sub: '잠시 후 다시 시도해주세요.',
      };
    }
    if (error.request) {
      return {
        main: '서버에서 응답이 없습니다.',
        sub: '네트워크 연결을 확인해주세요.',
      };
    }
  }
  return {
    main: '알 수 없는 오류가 발생했습니다.',
    sub: '잠시 후 다시 시도해주세요.',
  };
};

export function BookSearchError({ error, onRetry }: BookSearchErrorProps) {
  const { main, sub } = getErrorMessage(error);

  return (
    <div className="w-full h-full pb-4 fade-in-5">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
        <AlertCircle
          className="h-16 w-16 mb-4 text-slate-400"
          strokeWidth={1.5}
        />
        <h2 className="text-xl font-bold text-slate-800">
          <span className="block mt-2">오류가 발생했습니다.</span>
        </h2>
        <p className="mt-4 text-base text-slate-500 leading-relaxed">
          {main}
          <br />
          {sub}
        </p>
        {onRetry && (
          <Button
            type="button"
            variant="ghost"
            onClick={onRetry}
            className="mt-4 flex items-center gap-2 group"
          >
            <RotateCw
              size={16}
              className="transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
            />{' '}
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
}
