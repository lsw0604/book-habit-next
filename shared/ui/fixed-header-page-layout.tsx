import { ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { PageContainer } from './page-container';

interface FixedHeaderPageLayoutProps {
  header: ReactNode;
  children: ReactNode;
  /** @see PageContainer */
  fitViewport?: boolean;
}

/**
 * 상단에 고정 헤더(필터/검색 바)를 두는 페이지 레이아웃.
 *
 * 헤더는 흐름 안의 형제이므로 top 오프셋을 헤더 높이와 수동으로 맞출 필요가 없다.
 * 스크롤되는 페이지에서는 main을 기준으로 sticky 처리된다.
 */
export function FixedHeaderPageLayout({
  header,
  children,
  fitViewport = false,
}: FixedHeaderPageLayoutProps) {
  return (
    <PageContainer fitViewport={fitViewport}>
      <div className="sticky top-0 z-20 w-full shrink-0">{header}</div>
      <div
        className={cn('flex w-full flex-1 flex-col', fitViewport && 'min-h-0')}
      >
        {children}
      </div>
    </PageContainer>
  );
}
