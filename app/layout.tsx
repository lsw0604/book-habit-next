'use client';

import styled, { css } from 'styled-components';
import { usePathname } from 'next/navigation';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Modal from 'components/modal';
import Toast from 'components/common/Toast';
import Header from 'components/header';
import ModalPortal from 'components/modal/ModalPortal';
import NavigationBar from 'components/bottom';

import ReduxProvider from 'lib/ReduxProvider';
import QueryProvider from 'lib/QueryProvider';
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry';

const LayoutCSS = css`
  padding: 4rem 0rem;
  @media screen and (min-width: 768ox) {
    padding: 4rem 10%;
  }
`;

const Container = styled.div<{ $pathname: string }>`
  background-color: ${({ theme }) => theme.mode.main};
  width: 100vw;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  ${({ $pathname }) => $pathname !== '/' && LayoutCSS}
`;

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
              <Container $pathname={pathname}>{children}</Container>
              <NavigationBar />
              <ModalPortal>
                <Modal />
              </ModalPortal>
              <Toast />
              <div id="root-modal" />
              <ReactQueryDevtools position="top-right" />
            </StyledComponentsRegistry>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
