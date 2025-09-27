'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/utils';
import { BottomNavBar } from '@/widgets/bottom-nav-bar';
import { HeaderBar } from '@/widgets/header-bar';

import {
  QueryProvider,
  ReduxProvider,
  AuthProvider,
  ApiProvider,
} from './providers';

import './global.css';

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
            <ApiProvider>
              <AuthProvider>
                <ModalRoot />
                <div id="root-toast" />
                <div id="root-modal" />
                <HeaderBar />
                <main
                  className={cn(
                    'w-screen h-screen min-h-screen box-border flex flex-col',
                    pathname !== '/' && 'py-16'
                  )}
                >
                  {children}
                </main>
                <BottomNavBar />
              </AuthProvider>
            </ApiProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
