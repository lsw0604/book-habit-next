'use client';

import { usePathname } from 'next/navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Header from '../components/header';
import Bottom from '../components/bottom';

import ReduxProvider from '@/providers/redux-provider';
import QueryProvider from '@/providers/query-provider';
import HydrationProvider from '@/providers/hydration-provider';

import { cn } from '@/utils/class-name';
import '@fontsource/noto-sans-kr';
import './global.css';
import dynamic from 'next/dynamic';

const ToastPortal = dynamic(() => import('@/components/toast/toast-portal'));
const ModalPortal = dynamic(() => import('@/components/modal/modal-portal'));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <body>
        <div id="root-toast" />
        <ReduxProvider>
          <QueryProvider>
            <HydrationProvider>
              <>
                <ToastPortal />
                <Header />
                <div
                  className={cn(
                    'w-screen h-screen p-0 box-border',
                    pathname !== '/' && 'py-16 px-0'
                  )}
                >
                  {children}
                </div>
                <Bottom />
                <ModalPortal />
                <ReactQueryDevtools position="top" />
              </>
            </HydrationProvider>
          </QueryProvider>
        </ReduxProvider>
        <div id="root-modal" />
      </body>
    </html>
  );
}
