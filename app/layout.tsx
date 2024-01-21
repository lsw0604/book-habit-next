'use client';

import { usePathname } from 'next/navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import Modal from 'components/modal';
// import Header from 'components/header';
// import Toast from 'components/common/Toast';
// import ModalPortal from 'components/modal/ModalPortal';
import Header from '../components/header';
import Bottom from '../components/bottom';

import ReduxProvider from 'lib/ReduxProvider';
import QueryProvider from 'lib/QueryProvider';
import StyledComponentsRegistry from '@/components/provider/styled-components-provider';

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
            <StyledComponentsRegistry>
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
              {/* <NavigationBar /> */}
              {/* <ModalPortal>
                <Modal />
              </ModalPortal> */}
              {/* <Toast /> */}
              {/* <div id="root-modal" /> */}
              {/* <ReactQueryDevtools position="top-right" panelPosition="top" /> */}
            </StyledComponentsRegistry>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
