'use client';

import { RootState, useAppSelector } from '@/app/store';
import { Skeleton } from '@/components/ui/skeleton';
import useCommentsLikeDeleteMutation from '@/queries/comments/useCommentsLikeDeleteMutation';
import useCommentsLikeRegisterMutation from '@/queries/comments/useCommentsLikeRegisterMutation';
import { HeartIcon } from 'lucide-react';

interface CommentItemHeartProps {
  comment_id: number;
  like_user_ids: { user_id: number }[];
}

export default function CommentItemHeart({
  comment_id,
  like_user_ids,
}: CommentItemHeartProps) {
  const { id, isLogged } = useAppSelector((state: RootState) => state.user);

  const isLiked = like_user_ids?.some((like) => like.user_id === id);

  const {
    mutate: commentLikeRegisterMutation,
    isLoading: commentLikeMutationIsLoading,
  } = useCommentsLikeRegisterMutation(comment_id);

  const {
    mutate: commentLikeDeleteMutation,
    isLoading: commentLikeDeleteMutationIsLoading,
  } = useCommentsLikeDeleteMutation(comment_id);

  const CommentLikeHandler = (isLike: boolean) => {
    if (isLogged) {
      return null;
    }

    if (isLike) {
      commentLikeRegisterMutation(comment_id);
    } else {
      commentLikeDeleteMutation(comment_id);
    }
  };

  return (
    <div className="h-5 w-12 inline-flex gap-4">
      <div className="h-full w-4 cursor-pointer flex justify-center items-center">
        {commentLikeMutationIsLoading || commentLikeDeleteMutationIsLoading ? (
          <Skeleton className="w-full h-full bg-slate-200 rounded-full" />
        ) : isLiked ? (
          <HeartIcon
            className="fill-rose-300 stroke-rose-300 w-4 h-4"
            onClick={() => CommentLikeHandler(false)}
          />
        ) : (
          <HeartIcon
            className="w-4 h-4"
            onClick={() => CommentLikeHandler(true)}
          />
        )}
      </div>
      <p className="h-full text-sm">{like_user_ids.length}</p>
    </div>
  );
}
