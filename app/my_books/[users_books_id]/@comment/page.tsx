import React from 'react';

export default function MyBookDetailCommentPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  return <div>MyBookDetailCommentPage{users_books_id}</div>;
}
