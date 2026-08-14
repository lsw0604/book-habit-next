import { ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * true  — 뷰포트 높이에 딱 맞춰 고정된다. 페이지가 스크롤되지 않으므로,
   *         스크롤이 필요하면 내부 영역이 직접 처리한다 (칸반 컬럼 등).
   * false — 내용에 따라 늘어나고 넘치면 main이 스크롤된다 (기본).
   */
  fitViewport?: boolean;
}

/**
 * 페이지 최상위 컨테이너.
 *
 * AppShell의 main이 확정된 높이를 갖기 때문에, 페이지는 "늘어날 것인가(스크롤)"와
 * "뷰포트에 맞출 것인가(고정)" 둘 중 하나만 고르면 된다.
 */
export function PageContainer({
  children,
  className,
  fitViewport = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-1 flex-col',
        // min-h-0이 있어야 콘텐츠보다 작아질 수 있고, 그래야 내부 스크롤이 성립한다
        fitViewport && 'min-h-0',
        className
      )}
    >
      {children}
    </div>
  );
}
