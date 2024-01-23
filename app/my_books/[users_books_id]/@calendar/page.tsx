import React from 'react';

export default function MyBookDetailCalendarPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  return <div>MyBookDetailCalendarPage{users_books_id}</div>;
}
