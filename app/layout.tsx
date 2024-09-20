'use client';

import { usePathname } from 'next/navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ModalPortal from '@/components/modal/modal-portal';
import Modal from '../components/modal';
import Header from '../components/header';
import Bottom from '../components/bottom';

import ReduxProvider from '@/providers/redux-provider';
import QueryProvider from '@/providers/query-provider';

import '@fontsource/noto-sans-kr';
import './global.css';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <>
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
              <ModalPortal>
                <Modal />
              </ModalPortal>
              <ReactQueryDevtools position="top" />
            </>
          </QueryProvider>
        </ReduxProvider>
        <div id="root-modal" />
      </body>
    </html>
  );
}
