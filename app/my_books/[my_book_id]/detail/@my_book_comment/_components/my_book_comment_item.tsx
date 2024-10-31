import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/class-name';
import { getTimeDescription } from '@/utils/date';
import { createMarkUp } from '@/utils/create-mark-up';
import { IconCommentDots, IconHeart } from '@/style/icon';

interface MyBookCommentItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
    MyBookCommentItemType {
  classNames?: {
    header?: {
      container?: string;
      status?: string;
      time?: string;
    };
    content?: {
      container?: string;
      comment?: string;
    };
  };
  children?: ReactNode;
}

export default function MyBookCommentItem({
  id,
  myBookId,
  comment,
  createdAt,
  updatedAt,
  isPublic,
  className,
  classNames,
  _count,
  children,
  ...props
}: MyBookCommentItemProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-2 p-2 border-2 transition-all text-left text-sm w-full mb-1 rounded-md',
        className
      )}
    >
      <div className={cn('flex w-full', classNames?.header?.container)}>
        <span
          className={cn('text-sm font-semibold', classNames?.header?.status)}
        >
          {isPublic ? '공개' : '비공개'}
        </span>
        <span
          className={cn('ml-auto text-xs opacity-50', classNames?.header?.time)}
        >
          {getTimeDescription(createdAt, updatedAt)}
        </span>
      </div>
      <div
        className={cn(
          'text-sm font-normal text-gray-800 cursor-pointer min-h-40',
          classNames?.content?.container
        )}
      >
        <p
          className={cn(classNames?.content?.comment)}
          dangerouslySetInnerHTML={createMarkUp(comment)}
        />
      </div>
      {children}
      <div className="w-full">
        <div className="ml-auto flex gap-2 items-center font-semibold">
          <IconHeart className="w-4 h-4" />
          <span className="text-base">{_count.commentLike}</span>
          <IconCommentDots className="w-4 h-4" />
          <span className="text-base">{_count.commentReply}</span>
        </div>
      </div>
    </div>
  );
}
