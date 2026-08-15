'use client';

import { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

function WidgetErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="m-2 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
      <p className="text-sm font-semibold text-gray-900">
        이 영역을 표시하지 못했습니다
      </p>
      <p className="mt-1 break-keep text-xs text-gray-500">
        {error instanceof Error ? error.message : '알 수 없는 오류'}
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-4 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
      >
        다시 시도
      </button>
    </div>
  );
}

/**
 * 위젯 하나의 실패를 그 자리에 가둔다.
 * 상세 페이지처럼 독립된 위젯 여럿이 한 화면을 나눠 쓰는 곳에서, 한쪽의 렌더 예외가
 * 페이지 전체를 가져가지 않도록 각 위젯을 감싼다.
 *
 * Suspense는 넣지 않는다. 이 저장소의 위젯들은 useQuery(useSuspenseQuery가 아니다)로
 * 로딩을 직접 처리하고 lazy()도 아니라서 suspend하지 않는다. 실제로 suspend하는 자식이
 * 생기면 그때 추가한다 — modal-manager가 lazy() 때문에 Suspense를 쓰는 것이 그 예다.
 *
 * 주의: TanStack Query는 기본값이 throwOnError: false이므로 쿼리 실패는 여기로 오지 않는다.
 * 여기서 잡히는 것은 렌더 중 발생한 예외다.
 */
export function WidgetBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={WidgetErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
