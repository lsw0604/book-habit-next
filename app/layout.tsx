'use client';

import styled, { css } from 'styled-components';
import { usePathname } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';

import Header from 'components/header';
import NavigationBar from 'components/bottom';
import ModalPortal from 'components/modal/ModalPortal';
import Modal from 'components/modal';
import ReduxProvider from 'lib/ReduxProvider';
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry';
import StyledComponentsThemeProvider from 'lib/StyledComponentsThemeProvider';
import { queryClient } from 'queries';

import '@fontsource/noto-sans-kr/700.css';

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
          <QueryClientProvider client={queryClient}>
            <StyledComponentsRegistry>
              <StyledComponentsThemeProvider>
                <Header />
                <Container $pathname={pathname}>{children}</Container>
                <NavigationBar />
                <ModalPortal>
                  <Modal />
                </ModalPortal>
                <div id="root-modal" />
              </StyledComponentsThemeProvider>
            </StyledComponentsRegistry>
          </QueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
