import { AlertCircle, RotateCw } from 'lucide-react';

import { APIError } from '@/shared/api';
import { Button } from '@/shared/ui/button';

interface SearchedBookActiveActionsErrorProps {
  error: Error;
  onRetry?: () => void;
}

/** 네트워크 실패도 래퍼가 APIError로 정규화하므로 여기서 axios를 알 필요가 없다 */
const getErrorMessage = (error: Error) => {
  if (error instanceof APIError) {
    return error.message;
  }
  return '알 수 없는 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.';
};

export function SearchedBookActiveActionsError({
  error,
  onRetry,
}: SearchedBookActiveActionsErrorProps) {
  const message = getErrorMessage(error);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full bg-white p-4 rounded-xl border border-gray-200 text-center">
      <AlertCircle className="h-6 w-6 text-slate-400" strokeWidth={1.5} />
      <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">
        {message}
      </p>
      {onRetry && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="flex items-center gap-1.5 group"
        >
          <RotateCw
            size={14}
            className="transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
          />
          다시 시도
        </Button>
      )}
    </div>
  );
}
