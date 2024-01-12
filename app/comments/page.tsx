'use client';

import CommentsFilterProvider from 'components/comments/CommentsFilterProvider';
import CommentsTimer from 'components/comments/CommentsTimer';

export default function CommentsPage() {
  return (
    <CommentsFilterProvider>
      <CommentsTimer />
    </CommentsFilterProvider>
  );
}
