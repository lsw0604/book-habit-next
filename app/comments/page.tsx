import CommentsFilterProvider from 'components/comments/CommentsFilterProvider';
import CommentsTimer from 'components/comments/CommentsTimer';
import useCommentsFilterHook from '@/hooks/useCommentsFilterHook';
import useCommentsListQuery from '@/queries/comments/useCommentsListQuery';

const SERVER_END_POINT = `${process.env.NEXT_PUBLIC_SERVER}/api/comments/list`;

export default async function CommentsPage() {
  // const { filter } = useCommentsFilterHook();
  // const { refetch } = useCommentsListQuery(filter);

  const response = await fetch(SERVER_END_POINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Data fetching was failed');
  }

  const { comments } = await response.json();

  console.log('data', comments);

  return (
    <CommentsFilterProvider comments={comments}>
      <CommentsTimer
      // refetch={refetch}
      />
    </CommentsFilterProvider>
  );
}
