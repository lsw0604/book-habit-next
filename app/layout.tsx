'use client';

import styled, { css } from 'styled-components';
import { usePathname } from 'next/navigation';

import ReduxProvider from 'lib/ReduxProvider';
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry';
import StyledComponentsThemeProvider from 'lib/StyledComponentsThemeProvider';

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
          <StyledComponentsRegistry>
            <StyledComponentsThemeProvider>
              <Container $pathname={pathname}>{children}</Container>
            </StyledComponentsThemeProvider>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
