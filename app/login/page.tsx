import { LoginFormWrapper } from '@/features/login'
import { PageContainer } from '@/shared/ui/page-container';

export default function LoginPage() {
  return (
    <PageContainer variant="vertical" className="h-full justify-center">
      <h1 className="text-center text-4xl font-bold">로그인</h1>
      <div className="w-full flex justify-center">
        <LoginFormWrapper />
      </div>
    </PageContainer>
  );
}
