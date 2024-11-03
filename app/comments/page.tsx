import { Suspense } from 'react';

import CommentTag from './_components/comment-tag';
import CommentList from './_components/comment-list';
import CommentPopover from './_components/comment-popover';

export default async function CommentsPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between p-4">
        <CommentTag />
        <CommentPopover />
      </div>
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <CommentList />
        </Suspense>
      </div>
    </div>
  );
}
