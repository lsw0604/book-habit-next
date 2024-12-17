import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/class-name';
import { getTimeDescription } from '@/utils/date';
import { createMarkUp } from '@/utils/create-mark-up';
import { IconCommentDots, IconHeart } from '@/style/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface MyBookCommentItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
    Omit<MyBookCommentItemType, 'id'> {
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
  myBookId,
  comment,
  createdAt,
  updatedAt,
  isPublic,
  className,
  classNames,
  _count,
  user,
  children,
  ...props
}: MyBookCommentItemProps) {
  const _ = myBookId;
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-2 p-2 border-2 transition-all text-left text-sm w-full mb-1 rounded-md',
        className
      )}
    >
      <div className={cn('flex w-full', classNames?.header?.container)}>
        <Avatar>
          <AvatarImage src={user.profile} alt={user.name} />
          <AvatarFallback>
            <Skeleton className="w-full h-full bg-slate-200" />
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            'text-sm ml-4 flex items-center',
            classNames?.header?.status
          )}
        >
          <span className="text-center font-semibold">{user.name}</span>
        </div>
        <div
          className={cn(
            'ml-auto opacity-50 flex flex-col gap-2 text-xs',
            classNames?.header?.time
          )}
        >
          <span className="h-auto">
            {getTimeDescription(createdAt, updatedAt)}
          </span>
          <span className="h-auto w-auto ml-auto">
            {isPublic ? '공개' : '비공개'}
          </span>
        </div>
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

MyBookCommentItem.Loader = function () {
  return (
    <li className="snap-start">
      <div className="flex flex-col gap-2 p-2 border-2 transition-all w-full mb-1 rounded-md">
        <div className="flex w-full h-5">
          <Skeleton className="h-full w-12" />
          <Skeleton className="ml-auto h-full w-28" />
        </div>
        <div className="w-full h-40">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-full">
          <div className="ml-auto flex gap-2 items-center">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>
    </li>
  );
};
