import { ReactNode } from 'react';
import MyBookDetailInfo from './_components/my-book-detail-info';

export default function MyBookDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  return (
    <div className="w-full h-full">
      <MyBookDetailInfo users_books_id={users_books_id} />
      {children}
    </div>
  );
}
