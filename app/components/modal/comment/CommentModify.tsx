'use client';

import { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

import Rating from 'components/common/rating';
import Textarea from 'components/common/textarea';
import Button from 'components/common/button';
import ModalHeader from 'components/modal/ModalHeader';
import useMyBookCommentUpdateMutation from '@/queries/myBook/useMyBookCommentUpdateMutation';
import { IconPencil } from 'style/icon';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Content = styled.div`
  position: relative;
`;

const Footer = styled.div`
  position: relative;
`;

const HEADER_OPTION = {
  title: '한줄평 수정하기',
  sub: '등록된 한줄평의 평점과 평가 내용을 수정해주세요.',
  icon: <IconPencil />,
};

export default function CommentModify() {
  const dispatch = useAppDispatch();
  const { comment_id, rating, comment, users_books_id } = useAppSelector(
    (state: RootState) => state.myBook
  );

  if (!comment_id) return null;
  if (!users_books_id) return null;

  const onChangeMyBookRating = useCallback((rating: number) => {
    dispatch(myBookActions.setMyBookRating(rating));
  }, []);
  const onChangeMyBookComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(myBookActions.setMyBookComment(event.target.value));
    },
    []
  );

  const body: MyBookCommentUpdateMutationBodyType = {
    rating,
    comment,
  };

  const { mutate, isLoading } = useMyBookCommentUpdateMutation();

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ body, comment_id });
  };

  return (
    <Container onSubmit={onSubmit}>
      <ModalHeader {...HEADER_OPTION} />
      <Content>
        <Rating rating={rating} onChange={onChangeMyBookRating} />
        <Textarea
          style={{ minHeight: '150px' }}
          value={comment}
          onChange={onChangeMyBookComment}
        />
      </Content>
      <Footer>
        <Button isLoading={isLoading}>수정하기</Button>
      </Footer>
    </Container>
  );
}
