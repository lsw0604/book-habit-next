'use client';

import dayjs from 'dayjs';

import CommentItem from './comment-item';
import CommentHashtag from './comment-hashtag';

// import useCommentsListQuery from '@/queries/comments/useCommentsListQuery';
// import useCommentFilterHook from '@/hooks/useCommentFilterHook';
// import { LogoSad } from '@/style/icon';

export default function CommentList() {
  // const { filter, addFilter, removeFilter } = useCommentFilterHook();

  // const { data, isLoading } = useCommentsListQuery(filter);

  // if (!data || isLoading) return <CommentList.Loader />;
  // if (data.comments.length === 0) return <CommentList.Empty />;

  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      {/* <CommentHashtag
        data={data}
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
      /> */}
      <ul className="w-full h-full flex flex-col gap-4 p-4 overflow-auto snap-mandatory snap-y">
        {/* {data.comments.map((comment) => (
          <CommentItem comment={comment} key={comment.comment_id} />
        ))} */}
      </ul>
    </div>
  );
}

CommentList.Empty = function () {
  const MONTH = parseInt(dayjs().format('MM'));
  return (
    <div className="w-full h-full flex justify-center items-center px-4 pb-4">
      <div className="w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg p-4 flex flex-col justify-center items-center">
        {/* <LogoSad className="w-[40%] opacity-40" /> */}
        <p className="text-sm">{MONTH}월에 등록된 할줄평이 없습니다.</p>
      </div>
    </div>
  );
};

CommentList.Loader = function () {
  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <CommentHashtag.Loader />
      <ul className="w-full h-full flex flex-col gap-4 p-4 overflow-auto snap-mandatory snap-y">
        <CommentItem.Loader />
        <CommentItem.Loader />
        <CommentItem.Loader />
      </ul>
    </div>
  );
};
