'use client';

import PageContainer from '@/shared/common/page-container';
import { RegisterForm } from '@/features/register-form';

export default function RegisterPage() {
  return (
    <PageContainer variant="vertical">
      <h1 className="text-center text-4xl font-bold mt-4">회원가입</h1>
      <div className="w-full flex justify-center">
        <RegisterForm />
      </div>
    </PageContainer>
  );
}
