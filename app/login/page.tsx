import type { Metadata } from 'next';

import { LoginFormWrapper } from '@/features/login';
import { PageContainer } from '@/shared/ui/page-container';

export const metadata: Metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    <PageContainer fitViewport className="justify-center gap-6 p-4">
      <h1 className="text-center text-4xl font-bold">로그인</h1>
      <div className="flex w-full justify-center">
        <LoginFormWrapper />
      </div>
    </PageContainer>
  );
}
