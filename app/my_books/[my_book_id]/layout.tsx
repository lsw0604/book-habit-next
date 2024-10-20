import { ReactNode } from 'react';

export default async function MyBookDetailLayout({
  my_book_detail,
  my_book_comment,
  my_book_history,
}: {
  my_book_detail: ReactNode;
  my_book_comment: ReactNode;
  my_book_history: ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col p-2 overflow-auto">
      {my_book_detail}
      {my_book_comment}
      {my_book_history}
    </div>
  );
}
