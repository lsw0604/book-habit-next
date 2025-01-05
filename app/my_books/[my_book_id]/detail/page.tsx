import MyBookComment from './_components/my-book-comments';
import MyBookDetail from './_components/my-book-detail';
import MyBookHistory from './_components/my-book-history';
import ClientWrapper from '@/components/common/client-wrapper';

export default async function MyBookDetailPage({
  params,
}: {
  params: {
    my_book_id: number;
  };
}) {
  const myBookId = params.my_book_id;

  return (
    <div className="w-full h-full p-2 overflow-scroll scrollbar-none">
      <ClientWrapper>
        <MyBookDetail myBookId={myBookId} />
      </ClientWrapper>
      <ClientWrapper>
        <MyBookComment myBookId={myBookId} />
      </ClientWrapper>
      <ClientWrapper>
        <MyBookHistory myBookId={myBookId} />
      </ClientWrapper>
    </div>
  );
}
