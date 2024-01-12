'use client';

import styled from 'styled-components';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

import Avatar from 'components/common/Avatar';
import IconButton from 'components/common/button/IconButton';
import { IconCalendar, IconTrashCan } from 'style/icon';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { modalActions } from 'store/modal';
import { replyActions } from 'store/reply';

const Container = styled.li`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  margin-bottom: 1rem;
  gap: 8px;
`;

const ReplyHeaderContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
`;

const ReplyHeaderDateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const ReplyHeaderInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ReplyIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ReplyHeaderNameWrapper = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyWrapper = styled.div`
  width: 100%;
  min-height: 55px;
  height: auto;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 1rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

export default function CommentDetailReplyItem({
  created_at,
  name,
  profile,
  reply,
  reply_id,
  users_id,
}: CommentsReplyListQueryItemType) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { id } = useAppSelector((state: RootState) => state.user);

  const commentId = pathname.split('/')[2];
  const comment_id = parseInt(commentId);

  const modalHandler = useCallback((type: ModalComponentType) => {
    dispatch(modalActions.setModalState({ type }));
  }, []);

  const replyHandler = useCallback(() => {
    dispatch(replyActions.setReplyCommentId(comment_id));
    dispatch(replyActions.setReplyId(reply_id));
  }, []);

  const createdTime = dayjs(created_at).format('YYYY/MM/DD HH:mm:ss');
  const isAuth = users_id === id ? true : false;

  const replyDeleteHandler = () => {
    replyHandler();
    modalHandler('deleteReply');
  };

  return (
    <Container>
      <ReplyHeaderContainer>
        <ReplyIconContainer>
          <Avatar size="40px" src={profile} key={reply_id} />
          <ReplyHeaderInfoContainer>
            <ReplyHeaderNameWrapper>{name}</ReplyHeaderNameWrapper>
            <ReplyHeaderDateWrapper>
              <IconCalendar />
              &nbsp;
              {createdTime}
            </ReplyHeaderDateWrapper>
          </ReplyHeaderInfoContainer>
        </ReplyIconContainer>
        {isAuth ? (
          <IconButton onClick={replyDeleteHandler} icon={<IconTrashCan />}>
            Delete
          </IconButton>
        ) : null}
      </ReplyHeaderContainer>
      <ReplyWrapper>{reply}</ReplyWrapper>
    </Container>
  );
}
