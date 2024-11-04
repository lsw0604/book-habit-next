'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import Header from '@/components/header';
import Bottom from '@/components/bottom';

import ReduxProvider from '@/providers/redux-provider';
import QueryProvider from '@/providers/query-provider';

import { cn } from '@/utils/class-name';
import './global.css';
import { QueryClient } from '@tanstack/react-query';

const ToastPortal = dynamic(() => import('@/components/toast/toast-portal'));
const ModalPortal = dynamic(() => import('@/components/modal/modal-portal'));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="ko">
      <body>
        <div id="root-toast" />
        <ReduxProvider>
          <QueryProvider client={queryClient}>
            <React.Fragment>
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
            </React.Fragment>
          </QueryProvider>
        </ReduxProvider>
        <div id="root-modal" />
      </body>
    </html>
  );
}
