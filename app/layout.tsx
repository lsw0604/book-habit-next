import type { Metadata } from 'next';

import {
  QueryProvider,
  ReduxProvider,
  AuthProvider,
  ApiProvider,
} from './_providers';
import { AppShell } from './_shell';

import './global.css';

export const metadata: Metadata = {
  title: {
    default: '책벌래',
    template: '%s | 책벌래',
  },
  description: '부담없이 기록하는 독서기록장',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>
          <QueryProvider>
            <ApiProvider>
              <AuthProvider>
                <AppShell>{children}</AppShell>
              </AuthProvider>
            </ApiProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
