'use client';

import { ErrorBoundary } from 'react-error-boundary';
import Alert from '@/components/common/alert';
import MyBookCommentList from './my-book-comment-list';
import MyBookCommentHeader from './my-book-comment-header';
import MyBookCommentLoader from './my-book-comment-loader';

import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';

interface MyBookCommentProps {
  myBookId: number;
}

export default function MyBookComment({ myBookId }: MyBookCommentProps) {
  const { isLoading, data: comment } = useMyBookComment(myBookId);

  if (!comment || isLoading) return <MyBookCommentLoader />;

  return (
    <section className="my-3 px-2">
      <ErrorBoundary
        FallbackComponent={(response) => (
          <Alert message={response.error.message} status="ERROR" />
        )}
      >
        <MyBookCommentHeader myBookId={myBookId} comment={comment} />
      </ErrorBoundary>
      <ErrorBoundary
        FallbackComponent={(response) => (
          <Alert message={response.error.message} status="ERROR" />
        )}
      >
        <MyBookCommentList comment={comment} />
      </ErrorBoundary>
    </section>
  );
}
