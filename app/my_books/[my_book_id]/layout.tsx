import { ReactNode } from 'react';
import MyBookDetailInfo from './_components/my-book-detail-info';

export default function MyBookDetailLayout({
  detail,
  reply,
  params,
}: {
  detail: ReactNode;
  reply: ReactNode;
  params: { my_book_id: number };
}) {
  const { my_book_id } = params;
  return (
    <div className="w-full h-full">
      {my_book_id}
      {detail}
      {reply}
    </div>
  );
}
