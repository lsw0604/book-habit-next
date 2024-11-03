'use client';

import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';
import MyBookCommentHeader from './_components/my_book_comment_header';
import MyBookCommentList from './_components/my_book_comment_list';

export default function MyBookCommentPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { isFetching, isLoading, data } = useMyBookComment(params.my_book_id);

  return (
    <section className="my-3 px-2">
      <MyBookCommentHeader
        myBookId={params.my_book_id}
        isFetching={isFetching}
        isLoading={isLoading}
        comment={data}
      />
      <MyBookCommentList
        isFetching={isFetching}
        isLoading={isLoading}
        comment={data}
      />
    </section>
  );
}
