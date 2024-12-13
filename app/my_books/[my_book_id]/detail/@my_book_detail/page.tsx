'use client';

import { useMyBook } from '@/service/my-book/useMyBookService';
import MyBookInfo from './_components/my-book-info';
import MyBookDetailLoader from './_components/my-book-detail-loader';
import MyBookUpdateForm from './_components/my-book-update-form';
import MyBookDate from './_components/my-book-date';

export default function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const { data, isLoading } = useMyBook(params.my_book_id);

  if (!data || isLoading) return <MyBookDetailLoader />;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <MyBookInfo data={data} />
      <MyBookUpdateForm data={data} myBookId={params.my_book_id} />
      <MyBookDate createdAt={data.createdAt} updatedAt={data.updatedAt} />
    </div>
  );
}
