'use client';

export default function MyBookHistoryPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  return <div className="w-full h-auto">{params.my_book_id} History</div>;
}
