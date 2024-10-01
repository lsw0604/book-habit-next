'use client';

export default function MyBookReplyPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  return <div className="w-full h-auto">{params.my_book_id} Reply</div>;
}
