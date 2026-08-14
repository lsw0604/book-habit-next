import { PageContainer } from '@/shared/ui/page-container';

export default function Home() {
  return (
    <PageContainer
      fitViewport
      className="items-center justify-center gap-2 p-4 text-center"
    >
      <h2 className="text-lg">부담없이 기록하는 독서기록장</h2>
      <h1 className="text-4xl">책벌래</h1>
    </PageContainer>
  );
}
