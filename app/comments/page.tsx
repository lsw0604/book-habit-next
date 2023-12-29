'use client';

import CommentsFilterProvider from 'components/comments/CommentsFilterProvider';
import CommentsTimer from 'components/comments/CommentsTimer';
import useCommentsFilterHook from '@/hooks/useCommentsFilterHook';
import useCommentsListQuery from '@/queries/comments/useCommentsListQuery';

export default function CommentsPage() {
  const { filter } = useCommentsFilterHook();
  const { refetch } = useCommentsListQuery(filter);

  return (
    <CommentsFilterProvider>
      <CommentsTimer refetch={refetch} />
    </CommentsFilterProvider>
  );
}
