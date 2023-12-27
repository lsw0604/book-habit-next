'use client';

import styled from 'styled-components';

import Loader from 'components/common/Loader';
import { customize } from 'style/colors';
import { IconHeart, IconHeartFill } from 'style/icon';

import useCommentsLikeDeleteMutation from 'queries/comments/useCommentsLikeDeleteMutation';
import useCommentsLikeRegisterMutation from 'queries/comments/useCommentsLikeRegisterMutation';
import useToastHook from '@/hooks/useToastHook';
import { RootState, useAppSelector } from '@/app/store';

interface IProps {
  comment_id: number;
  like_user_ids: { user_id: number }[];
}

const Container = styled.div`
  height: 18px;
  width: 50px;
  display: inline-flex;
  gap: 1rem;
`;

const HeartNumber = styled.p`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const HeartIconWrapper = styled.div<{ $isLiked?: boolean }>`
  height: 100%;
  width: 1rem;
  cursor: pointer;
  svg {
    width: 100%;
    fill: ${({ $isLiked, theme }) =>
      $isLiked ? customize.rose['300'] : theme.mode.typo_sub};
  }
`;

export default function CommentsHeart({ comment_id, like_user_ids }: IProps) {
  const { id, isLogged } = useAppSelector((state: RootState) => state.user);

  const { addToast } = useToastHook();

  const isLiked = like_user_ids?.some((like) => like.user_id === id);

  const {
    mutate: commentLikeRegisterMutation,
    isLoading: commentLikeMutationIsLoading,
  } = useCommentsLikeRegisterMutation(comment_id);

  const {
    mutate: commentLikeDeleteMutation,
    isLoading: commentLikeDeleteMutationIsLoading,
  } = useCommentsLikeDeleteMutation(comment_id);

  const commentLikeHandler = (isLike: boolean) => {
    if (!isLogged) {
      return addToast({ message: '로그인이 필요합니다.', status: 'error' });
    }

    if (isLike) {
      commentLikeRegisterMutation(comment_id);
    } else {
      commentLikeDeleteMutation(comment_id);
    }
  };

  return (
    <Container>
      <HeartIconWrapper $isLiked={isLiked}>
        {commentLikeMutationIsLoading || commentLikeDeleteMutationIsLoading ? (
          <Loader />
        ) : isLiked ? (
          <IconHeartFill onClick={() => commentLikeHandler(false)} />
        ) : (
          <IconHeart onClick={() => commentLikeHandler(true)} />
        )}
      </HeartIconWrapper>
      <HeartNumber>{like_user_ids.length}</HeartNumber>
    </Container>
  );
}
