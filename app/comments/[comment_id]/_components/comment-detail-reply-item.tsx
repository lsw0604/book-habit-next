import { RootState, useAppSelector } from '@/app/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { v4 } from 'uuid';

export default function CommentDetailReplyItem({
  created_at,
  name,
  profile,
  reply,
  reply_id,
  users_id,
}: CommentsReplyListQueryItemType & { comment_id: number }) {
  const { isLogged, id } = useAppSelector((state: RootState) => state.user);

  const createdTime = dayjs(created_at).format('YYYY/MM/DD HH:mm:ss');

  const isAuth = isLogged ? (users_id === id ? true : false) : false;
  return (
    <li className="relative grid grid-cols-1 gap-2 mb-2 border rounded-lg">
      <div className="relative flex gap-4">
        <Avatar>
          <AvatarImage src={profile} alt={v4()} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="relative text-sm whitespace-nowrap truncate overflow-hidden">
              {name}
            </p>
          </div>
          <p className="text-gray-400 text-xs flex items-center">
            <CalendarIcon className="w-3 h-3" />
            &nbsp;
            {createdTime}
          </p>
        </div>
      </div>
      <p className="w-full min-h-10 text-sm h-auto flex items-center py-2 px-4 rounded-lg bg-[rgba(0,0,0,0.05)]">
        {reply}
      </p>
      {isAuth && (
        <p className="flex justify-end text-xs gap-4">
          <span>삭제</span>
          <span>수정</span>
        </p>
      )}
    </li>
  );
}

CommentDetailReplyItem.Loader = function () {
  return (
    <li className="relative grid grid-cols-1 gap-2 border rounded-lg mb-2">
      <div className="relative flex gap-4">
        <Skeleton className="w-10 h-10 bg-slate-300 rounded-full" />
        <div className="flex flex-col w-auto gap-2">
          <div className="flex flex-row justify-between">
            <Skeleton className="w-[100px] h-[20px] bg-slate-300" />
          </div>
          <Skeleton className="w-[120px] h-[12px] bg-slate-300" />
        </div>
      </div>
      <Skeleton className="w-full h-10 bg-slate-300" />
    </li>
  );
};
