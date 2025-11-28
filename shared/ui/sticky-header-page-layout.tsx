import { ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { PageContainer } from './page-container';

interface StickyHeaderPageLayoutProps {
  header: ReactNode;
  children: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

export function StickyHeaderPageLayout({
  header,
  children,
  headerClassName,
  contentClassName,
}: StickyHeaderPageLayoutProps) {
  return (
    <PageContainer variant="vertical">
      <div
        className={cn(
          'w-full flex justify-center bg-white sticky top-16 z-10',
          headerClassName
        )}
      >
        {header}
      </div>
      <div className={cn('flex-1 overflow-y-auto flex flex-col', contentClassName)}>
        {children}
      </div>
    </PageContainer>
  );
}
