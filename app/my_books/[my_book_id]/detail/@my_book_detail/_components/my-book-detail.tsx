'use client';

import MyBookDate from './my-book-date';
import MyBookForm from './my-book-form';
import MyBookInfo from './my-book-info';
import MyBookDetailLoader from './my-book-detail-loader';
import { useMyBook } from '@/service/my-book/useMyBookService';

interface MyBookDetailProps {
  myBookId: number;
}

export default function MyBookDetail({ myBookId }: MyBookDetailProps) {
  const { data, isLoading } = useMyBook(myBookId);

  if (!data || isLoading) return <MyBookDetailLoader />;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <MyBookInfo payload={data} />
      <MyBookForm myBookStatus={data.status} rating={data.rating} />
      <MyBookDate createdAt={data.createdAt} updatedAt={data.updatedAt} />
    </div>
  );
}
