import MyBookInfo from './my-book-info';
import MyBookDate from './my-book-date';
import MyBookLoader from './my-book-loader';
import MyBookUpdateForm from './my-book-update-form';

import { useMyBook } from '@/service/my-book/useMyBookService';

interface BookDetailProps {
  myBookId: number;
}

export default function MyBookDetail({ myBookId }: BookDetailProps) {
  const { data, isLoading } = useMyBook(myBookId);

  if (!data || isLoading) return <MyBookLoader />;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <MyBookInfo data={data} />
      <MyBookUpdateForm data={data} myBookId={myBookId} />
      <MyBookDate createdAt={data.createdAt} updatedAt={data.updatedAt} />
    </div>
  );
}
