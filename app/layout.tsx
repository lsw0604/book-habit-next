'use client';

import ReduxProvider from 'lib/ReduxProvider';
import StyledComponentsRegistry from 'lib/StyledComponentsRegistry';
import StyledComponentsThemeProvider from 'lib/StyledComponentsThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <StyledComponentsRegistry>
            <StyledComponentsThemeProvider>
              {children}
            </StyledComponentsThemeProvider>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
