'use client';

import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import CommentAddForm from 'components/modal/comment/CommentAddForm';
import ModalHeader from 'components/modal/ModalHeader';
import { IconPencil } from 'style/icon';

import useMyBookCommentRegisterMutation from 'queries/myBook/useMyBookCommentRegisterMutation';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { myBookActions } from 'store/myBook';
import { modalActions } from 'store/modal';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: relative;
`;

const HEADER_OPTION = {
  title: '한줄평 등록하기',
  sub: '내 서재에 등록된 책의 상태에 따라 한줄평을 등록해주세요.',
  icon: <IconPencil />,
};

export default function CommentRegister() {
  const dispatch = useAppDispatch();
  const {
    comment,
    status,
    users_books_id,
    rating,
    comment_isOpen,
    useValidation,
  } = useAppSelector((state: RootState) => state.myBook);

  const body: MyBookCommentMutationRequestType = {
    users_books_id: users_books_id as number,
    status,
    comment,
    comment_is_open: comment_isOpen,
    rating,
  };

  const { mutate, isLoading, isSuccess } = useMyBookCommentRegisterMutation(
    users_books_id as number
  );

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(myBookActions.setMyBookUseValidation(true));
    if (!useValidation) return null;
    mutate(body);
    dispatch(myBookActions.setMyBookUseValidation(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(modalActions.setModalClose());
    }
  }, [isSuccess]);

  return (
    <Container onSubmit={onSubmit}>
      <ModalHeader {...HEADER_OPTION} />
      <Content>
        <CommentAddForm />
      </Content>
      <Footer>
        <Button isLoading={isLoading}>등록하기</Button>
      </Footer>
    </Container>
  );
}
