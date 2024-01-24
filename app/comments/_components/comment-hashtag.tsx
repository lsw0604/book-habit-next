import { Skeleton } from '@/components/ui/skeleton';

import { COMMENT_HASHTAG_LOADER_SIZES } from '@/utils/staticData';
import { cn } from '@/lib/utils';

interface CommentHashtagProps {
  data: CommentsListQueryResponseType;
  filter: string[];
  addFilter: (tag: string) => void;
  removeFilter: (tag: string) => void;
}

const hashtag: string[] = [];

export default function CommentHashtag({
  data,
  filter,
  addFilter,
  removeFilter,
}: CommentHashtagProps) {
  const filterHandler = (tag: string) => {
    if (filter.includes(tag)) {
      removeFilter(tag);
    } else {
      addFilter(tag);
    }
  };

  const isOn = (tag: string) => {
    return filter.includes(tag);
  };

  data.comments.forEach((comment) => {
    if (!hashtag.includes(comment.title)) {
      hashtag.push(comment.title);
    }
    if (!hashtag.includes(comment.status)) {
      hashtag.push(comment.status);
    }
    if (!hashtag.includes(comment.gender)) {
      hashtag.push(comment.gender);
    }
    if (!hashtag.includes(comment.age_category)) {
      hashtag.push(comment.age_category);
    }
  });

  return (
    <ul className="w-full h-auto max-h-24 overflow-scroll flex gap-1 flex-row px-0 py-4 flex-wrap relative snap-y snap-mandatory mb-2">
      {hashtag.map((tag) => (
        <li
          key={tag}
          onClick={() => filterHandler(tag)}
          className={cn(
            'ml-2 text-xs rounded-full max-w-[10rem] min-w-[4rem] px-4 py-[5px] text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer shadow-md snap-start',
            isOn(tag) && 'font-bold'
          )}
        >
          #&nbsp;{tag}
        </li>
      ))}
    </ul>
  );
}

CommentHashtag.Loader = function () {
  return (
    <ul className="w-full h-auto max-h-24 flex gap-1 flex-row px-0 py-4 flex-wrap relative mb-2">
      {COMMENT_HASHTAG_LOADER_SIZES.map((size, index) => (
        <li className="ml-2 rounded-full w-auto" key={index}>
          <Skeleton className={cn('h-[20px] bg-slate-200', `w-[${size}]`)} />
        </li>
      ))}
    </ul>
  );
};
