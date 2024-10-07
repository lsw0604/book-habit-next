'use client';

import useMyBookQuery from '@/queries/my-book/useMyBookQuery';
import MyBookInfo from './_components/my-book-info';
import MyBookForm from './_components/my-book-form';
import MyBookDate from './_components/my-book-date';

export default function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { my_book_id } = params;
  const myBookId = Number(my_book_id);
  const { data, isLoading } = useMyBookQuery(myBookId);

  if (!data || isLoading) return <MyBookDetailPage.Loader />;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <MyBookInfo payload={data} />
      <MyBookForm myBookStatus={data.status} rating={data.rating} />
      <MyBookDate createdAt={data.createdAt} updatedAt={data.updatedAt} />
    </div>
  );
}

MyBookDetailPage.Loader = function () {
  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent p-2">
      <MyBookInfo.Loader />
    </div>
  );
};
