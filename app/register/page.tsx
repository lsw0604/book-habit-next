import { RegisterFormWrapper } from '@/features/register';
import { PageContainer } from '@/shared/ui/page-container';

export default function RegisterPage() {
  return (
    <PageContainer variant="vertical">
      <h1 className="text-center text-4xl font-bold mt-4">회원가입</h1>
      <div className="w-full flex justify-center">
        <RegisterFormWrapper />
      </div>
    </PageContainer>
  );
}
