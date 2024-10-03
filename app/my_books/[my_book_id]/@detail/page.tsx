'use client';

import useMyBookDetailQuery from '@/queries/my-book/useMyBookDetailQuery';
import MyBookInfo from './_components/my-book-info';
import MyBookStatus from './_components/my-book-status';
import MyBookRating from './_components/my-book-rating';

export default function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { data, isLoading } = useMyBookDetailQuery(params.my_book_id);

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent p-2">
      <MyBookInfo info={data.book} />
      <MyBookStatus status={data.status} />
      <MyBookRating rating={data.rating} myBookId={params.my_book_id} />
      {data.tag.map((tag) => (
        <div key={tag.id}>{tag.tag}</div>
      ))}

      {data.createdAt}
      {data.updatedAt}
    </div>
  );
}
