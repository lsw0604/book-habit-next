'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import ModalHeader from 'components/modal/ModalHeader';
import ModalLogoBody from 'components/modal/ModalLogoBody';

import { IconTrashCan, LogoSad } from 'style/icon';
import useMyBookListDeleteMutation from 'queries/myBook/useMyBookListDeleteMutation';
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
  title: '서재에 등록된 책 삭제하시겠어요?',
  sub: '한번 삭제되면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTiON = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function MyBookDelete() {
  const dispatch = useAppDispatch();
  const { users_books_id } = useAppSelector((state: RootState) => state.myBook);

  const { mutate, isLoading, isSuccess } = useMyBookListDeleteMutation(
    users_books_id as number
  );

  const deleteHandler = () => mutate(users_books_id as number);

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
      <ModalLogoBody {...BODY_OPTiON} />
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
