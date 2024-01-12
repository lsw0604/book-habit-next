'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import ModalHeader from 'components/modal/ModalHeader';
import ModalLogoBody from 'components/modal/ModalLogoBody';

import { IconTrashCan, LogoSad } from 'style/icon';
import useMyBookHistoryDeleteMutation from 'queries/myBook/useMyBookHistoryDeleteMutation';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { myBookActions } from '@/app/store/myBook';

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
  title: '독서기록을 삭제하시겠어요?',
  sub: '한번 삭제하면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function HistoryDelete() {
  const dispatch = useAppDispatch();
  const { history_id, users_books_id } = useAppSelector(
    (state: RootState) => state.myBook
  );

  const { mutate, isLoading, isSuccess } = useMyBookHistoryDeleteMutation(
    history_id as number,
    users_books_id as number
  );

  const deleteHandler = () => mutate(history_id as number);

  const initHandler = () => {
    dispatch(modalActions.setModalClose());
    dispatch(myBookActions.setInitialState());
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
