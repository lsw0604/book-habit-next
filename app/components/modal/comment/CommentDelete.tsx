import { useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';
import ModalHeader from 'components/modal/ModalHeader';
import ModalDeleteBody from 'components/modal/ModalLogoBody';
import { IconTrashCan, LogoSad } from 'style/icon';
import useMyBookCommentDeleteMutation from 'queries/myBook/useMyBookCommentDeleteMutation';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { modalActions } from 'store/modal';
import { myBookActions } from 'store/myBook';

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
  title: '등록된 한줄평을 삭제하시겠어요?',
  sub: '한번 삭제되면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function CommentDelete() {
  const dispatch = useAppDispatch();
  const { comment_id, users_books_id } = useAppSelector(
    (state: RootState) => state.myBook
  );

  const { mutate, isLoading, isSuccess } = useMyBookCommentDeleteMutation(
    users_books_id as number,
    comment_id as number
  );

  const deleteHandler = () => {
    mutate(comment_id as number);
  };

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
      <ModalDeleteBody {...BODY_OPTION} />
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
