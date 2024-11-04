'use client';

import Alert from '@/components/common/alert';
import MyBookCommentHeader from './_components/my_book_comment_header';
import MyBookCommentList from './_components/my_book_comment_list';
import MyBookCommentLoader from './_components/my_book_comment_loader';

import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';
import { ErrorBoundary } from 'react-error-boundary';

export default function MyBookCommentPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { isFetching, isLoading, data } = useMyBookComment(params.my_book_id);

  if (!data || isLoading || isFetching) return <MyBookCommentLoader />;

  return (
    <section className="my-3 px-2">
      <ErrorBoundary
        FallbackComponent={(response) => (
          <Alert message={response.error.message} status="ERROR" />
        )}
      >
        <MyBookCommentHeader
          myBookId={params.my_book_id}
          comment={data.myBookComment}
        />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={(response) => (
          <Alert message={response.error.message} status="ERROR" />
        )}
      >
        <MyBookCommentList comment={data.myBookComment} />
      </ErrorBoundary>
    </section>
  );
}
