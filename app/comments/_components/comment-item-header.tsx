import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import dayjs from 'dayjs';
import { CalendarIcon, StarIcon } from 'lucide-react';
import { v4 } from 'uuid';

interface CommentHeaderProps {
  comment: Omit<
    CommentsItemType,
    | 'comment'
    | 'comment_id'
    | 'age_category'
    | 'gender'
    | 'reply_ids'
    | 'like_user_ids'
  >;
}

export default function CommentItemHeader({ comment }: CommentHeaderProps) {
  const { created_at, title, status, name, rating, profile } = comment;

  const createdTime = dayjs(created_at).format('YYYY/MM/DD');

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col w-[70%]">
        <h1 className="w-full text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h1>
        <span className="text-xs flex justify-start items-center text-slate-300">
          <CalendarIcon className="w-3 h-3 text-slate-500" />
          &nbsp;{createdTime}
          &nbsp;{status}
          &nbsp;{name}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 w-[100px]">
        <div className="flex items-center justify-between gap-2 w-[100px]">
          <div className="flex h-full gap-2 items-center">
            <StarIcon className="w-6 h-6 fill-yellow-300 stroke-yellow-300" />
            {rating}
          </div>
          <Avatar>
            <AvatarImage src={profile} alt={v4()} />
            <AvatarFallback>
              <Skeleton className="w-full h-full bg-slate-200" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
