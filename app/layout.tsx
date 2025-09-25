'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import Header from '@/components/header';
import Bottom from '@/components/bottom';

import ReduxProvider from '@/providers/redux-provider';
import QueryProvider from '@/providers/query-provider';

import { cn } from '@/utils/class-name';
import './global.css';

const ToastPortal = dynamic(() => import('@/components/toast/toast-portal'));
const ModalRoot = dynamic(
  () => import('@/widgets/modal-root').then(module => module.ModalRoot),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="ko" className="scrollbar-none">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <>
              <ToastPortal />
              <div id="root-toast" />
              <div id="root-modal" />
              <Header />
              <main
                className={cn(
                  'w-screen h-screen min-h-screen px-4 box-border flex flex-col',
                  pathname !== '/' && 'py-16'
                )}
              >
                {children}
              </main>
              <Bottom />
            </>
                <ModalRoot />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
