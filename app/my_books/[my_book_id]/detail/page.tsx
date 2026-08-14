import { ClientWrapper } from '@/shared/ui/client-wrapper';
import { PageContainer } from '@/shared/ui/page-container';
import { MyBookDetail } from '@/widgets/my-book-detail';
import { MyBookHistoryDetail } from '@/widgets/my-book-history-detail';
import { MyBookReviewDetail } from '@/widgets/my-book-review-detail';

export default function MyBookDetailPage({
  params,
}: {
  params: {
    my_book_id: string;
  };
}) {
  const myBookId = Number(params.my_book_id);

  return (
    <PageContainer className="p-2">
      <ClientWrapper>
        <MyBookDetail myBookId={myBookId} />
      </ClientWrapper>
      <ClientWrapper>
        <MyBookHistoryDetail myBookId={myBookId} />
      </ClientWrapper>
      <ClientWrapper>
        <MyBookReviewDetail myBookId={myBookId} />
      </ClientWrapper>
    </PageContainer>
  );
}
