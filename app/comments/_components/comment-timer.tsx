'use client';

import { queriesKey, queryClient } from '@/queries';
import { RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { useUpdateEffect } from 'usehooks-ts';

const { useCommentsListQueryKey } = queriesKey.comments;

export default function CommentTimer() {
  const [second, setSecond] = useState<number>(59);
  const [minute, setMinute] = useState<number>(2);

  const refreshHandler = () => {
    setMinute(2);
    setSecond(59);
    queryClient.invalidateQueries({
      queryKey: [useCommentsListQueryKey],
    });
  };

  useUpdateEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);

      if (second === 0) {
        setSecond(59);
        setMinute((prev) => prev - 1);
      }

      if (minute === 0 && second === 0) {
        refreshHandler();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, setSecond]);

  return (
    <div className="w-full flex justify-end h-8">
      <p className="mr-2 leading-8 text-sm">
        {minute}분{second}초 후에 새로고침 됩니다.
      </p>
      <div
        onClick={refreshHandler}
        className="w-8 h-8 rounded-full bg-slate-100 flex justify-center items-center cursor-pointer"
      >
        <RefreshCcwIcon className="w-4 h-4" />
      </div>
    </div>
  );
}
