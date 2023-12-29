import styled from 'styled-components';

import IconButton from 'components/common/button/IconButton';
import {
  IconCalendar,
  IconLock,
  IconLockOpen,
  IconPencil,
  IconStar,
  IconTrashCan,
} from 'style/icon';
import { customize } from 'style/colors';
import { useAppDispatch } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';
import { modalActions } from '@/app/store/modal';

interface IProps {
  item: MyBookCommentQueryItemType;
  users_books_id: number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
`;

const InfoStatus = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  svg {
    margin-left: 8px;
    height: 0.8rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const InfoDate = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 50%;
  justify-content: end;
`;

const IconBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 80%;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.mode.sub};
  color: ${({ theme }) => theme.mode.typo_main};
  box-shadow: ${({ theme }) => theme.shadow.md};
  align-items: center;
  svg {
    height: 70%;
    fill: ${customize.yellow['400']};
  }
`;

const IconRating = styled.div`
  display: flex;
  align-items: center;
`;

export default function MyBookDetailCommentHeader({
  item,
  users_books_id,
}: IProps) {
  const dispatch = useAppDispatch();

  const {
    status,
    comment,
    comment_id,
    comment_is_open,
    rating,
    updated_at,
    created_at,
  } = item;

  const onChangeMyBookCommentId = (comment_id: number) => {
    dispatch(myBookActions.setMyBookCommentId(comment_id));
  };
  const onChangeMyBookUsersBooksId = (users_books_id: number) => {
    dispatch(myBookActions.setMyBookUsersBooksId(users_books_id));
  };
  const modalHandler = (type: ModalComponentType) => {
    dispatch(modalActions.setModalType(type));
  };

  const deleteHandler = () => {
    modalHandler('deleteComment');
    onChangeMyBookCommentId(comment_id);
    onChangeMyBookUsersBooksId(users_books_id);
  };

  const modifyHandler = () => {
    dispatch(myBookActions.setMyBookComment(comment));
    dispatch(myBookActions.setMyBookRating(rating));
    dispatch(myBookActions.setMyBookCommentId(comment_id));
    dispatch(myBookActions.setMyBookUsersBooksId(users_books_id));
    modalHandler('modifyComment');
  };

  return (
    <Container>
      <InfoContainer>
        <InfoStatus>
          {status}
          {comment_is_open ? <IconLockOpen /> : <IconLock />}
        </InfoStatus>
        <InfoDate>
          <IconCalendar />
          {updated_at ? `${updated_at} 수정` : `${created_at} 등록`}
        </InfoDate>
      </InfoContainer>
      <IconContainer>
        <IconBox>
          <IconStar />
          <IconRating>{rating}</IconRating>
        </IconBox>
        <IconButton onClick={deleteHandler} icon={<IconTrashCan />}>
          Delete
        </IconButton>
        <IconButton onClick={modifyHandler} icon={<IconPencil />}>
          Modify
        </IconButton>
      </IconContainer>
    </Container>
  );
}
