'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { IconCommentDots } from 'style/icon';

interface IProps {
  comment_id: number;
  reply_ids: { reply_id: number }[];
  btn?: boolean;
}

const Container = styled.div`
  height: 18px;
  width: 50px;
  display: inline-flex;
  gap: 1rem;
  cursor: pointer;
`;

const ReplyNumber = styled.div`
  height: 100%;
  font-size: 100%;
  line-height: 100%;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyIconWrapper = styled.div`
  height: 100%;
  width: 1rem;
  svg {
    width: 100%;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function CommentsReply({ reply_ids, comment_id, btn }: IProps) {
  const router = useRouter();
  const navigateCommentDetail = btn
    ? () => router.push(`/comments/${comment_id}`)
    : () => null;

  return (
    <Container onClick={navigateCommentDetail}>
      <ReplyIconWrapper>
        <IconCommentDots />
      </ReplyIconWrapper>
      <ReplyNumber>{reply_ids.length}</ReplyNumber>
    </Container>
  );
}
