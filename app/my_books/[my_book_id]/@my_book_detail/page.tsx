'use client';

import useMyBookQuery from '@/queries/my-book/useMyBookQuery';
import MyBookInfo from './_components/my-book-info';
import MyBookForm from './_components/my-book-form';
import MyBookDate from './_components/my-book-date';
import MyBookTag from './_components/my-book-tag';

export default function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { data, isLoading } = useMyBookQuery(params.my_book_id);

  if (!data || isLoading) return <MyBookDetailPage.Loader />;
  console.log(data.tag);

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <MyBookInfo info={data.book} />
      <MyBookTag tags={data.tag} />
      <MyBookForm
        myBookId={params.my_book_id}
        myBookStatus={data.status}
        rating={data.rating}
      />
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
