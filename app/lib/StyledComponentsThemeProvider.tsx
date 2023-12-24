import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import useThemeHook from '@/hooks/useThemeHook';
import GlobalStyle from '@/style/globalStyle';

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
