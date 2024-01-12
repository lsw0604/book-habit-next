'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import ModalHeader from 'components/modal/ModalHeader';
import ModalLogoBody from 'components/modal/ModalLogoBody';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { modalActions } from 'store/modal';
import { replyActions } from 'store/reply';
import useCommentsReplyDeleteMutation from 'queries/comments/useCommentsReplyDeleteMutation';
import { IconTrashCan, LogoSad } from 'style/icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  line-height: 22px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const HEADER_OPTION = {
  title: '댓글을 삭제하시겠어요?',
  sub: '한번 삭제하면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function ReplyDelete() {
  const dispatch = useAppDispatch();
  const { reply_id, comment_id } = useAppSelector(
    (state: RootState) => state.reply
  );

  const { mutate, isLoading, isSuccess } = useCommentsReplyDeleteMutation(
    reply_id,
    comment_id
  );

  const deleteHandler = () => {
    mutate(reply_id);
  };

  const initHandler = () => {
    dispatch(replyActions.setReplyInitialState());
    dispatch(modalActions.setModalClose());
  };

  useEffect(() => {
    if (isSuccess) {
      initHandler();
    }
  }, [isSuccess]);

  return (
    <Container>
      <ModalHeader {...HEADER_OPTION} />
      <ModalLogoBody {...BODY_OPTION} />
      <Footer>
        <Button onClick={deleteHandler} isLoading={isLoading}>
          삭제할게요.
        </Button>
        <Button onClick={initHandler} $text>
          아니요
        </Button>
      </Footer>
    </Container>
  );
}
