'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/style/globalStyle';
import useThemeHook from '@/hooks/useThemeHook';

export default function StyledComponentsThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useThemeHook();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
