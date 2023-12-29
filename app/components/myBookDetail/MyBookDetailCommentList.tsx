'use client';

import styled from 'styled-components';

import IconButton from 'components/common/button/IconButton';
import MyBookDetailCommentItem from 'components/myBookDetail/MyBookDetailCommentItem';
import MyBookDetailLoader from 'components/myBookDetail/MyBookDetailLoader';
import useMyBookCommentListQuery from 'queries/myBook/useMyBookCommentListQuery';

import { IconPlus } from 'style/icon';
import { useAppDispatch } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';
import { modalActions } from '@/app/store/modal';

interface IProps {
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  height: 275px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1280px) {
    height: 100%;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  padding: 0 1rem;
  scroll-snap-type: y mandatory;
`;

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function MyBookDetailCommentList({ users_books_id }: IProps) {
  const dispatch = useAppDispatch();

  const onChangeMyBookUserBooksId = (users_books_id: number) => {
    dispatch(myBookActions.setMyBookUsersBooksId(users_books_id));
  };
  const onChangeModal = (type: ModalComponentType) => {
    dispatch(modalActions.setModalType(type));
  };

  const commentRegisterModalHandler = () => {
    onChangeMyBookUserBooksId(users_books_id);
    onChangeModal('registerComment');
  };

  const { data, isLoading, isFetching } =
    useMyBookCommentListQuery(users_books_id);

  if (!data) return null;
  if (isLoading || isFetching) return <MyBookDetailLoader mode="isLoading" />;

  return (
    <Container>
      {data.length !== 0 ? (
        <ListContainer>
          {data.map((item) => (
            <MyBookDetailCommentItem
              item={item}
              key={item.comment_id}
              users_books_id={users_books_id}
            />
          ))}
        </ListContainer>
      ) : (
        <MyBookDetailLoader mode="isEmpty" />
      )}
      <AddContainer>
        <IconButton
          onClick={commentRegisterModalHandler}
          icon={<IconPlus />}
          isLoading={isFetching}
        >
          AddComment
        </IconButton>
      </AddContainer>
    </Container>
  );
}
