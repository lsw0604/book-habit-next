'use client';

import CommentItem from './comment-item';
import CommentHashtag from './comment-hashtag';

import useCommentsListQuery from '@/queries/comments/useCommentsListQuery';
import useCommentFilterHook from '@/hooks/useCommentFilterHook';

export default function CommentList() {
  const { filter, addFilter, removeFilter } = useCommentFilterHook();

  const { data } = useCommentsListQuery(filter);

  if (!data) return null;

  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <CommentHashtag
        data={data}
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      <ul className="w-full h-full flex flex-col gap-4 p-4 overflow-auto snap-mandatory snap-y">
        {data.comments.map((comment) => (
          <CommentItem comment={comment} key={comment.comment_id} />
        ))}
      </ul>
    </div>
  );
}
