import type { Metadata } from 'next';

import { RegisterFormWrapper } from '@/features/register';
import { PageContainer } from '@/shared/ui/page-container';

export const metadata: Metadata = {
  title: '회원가입',
};

export default function RegisterPage() {
  return (
    <PageContainer className="gap-6 p-4">
      <h1 className="text-center text-4xl font-bold">회원가입</h1>
      <div className="flex w-full justify-center">
        <RegisterFormWrapper />
      </div>
    </PageContainer>
  );
}
