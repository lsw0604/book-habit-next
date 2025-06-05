import PageContainer from '@/shared/common/page-container';
import { LoginForm } from '@/features/login-form';

export default function LoginPage() {
  return (
    <PageContainer variant="vertical" className="h-full justify-center">
      <h1 className="text-center text-4xl font-bold">로그인</h1>
      <div className="w-full flex justify-center">
        <LoginForm />
      </div>
    </PageContainer>
  );
}
