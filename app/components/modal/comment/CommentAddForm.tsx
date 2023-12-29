'use client';

import styled from 'styled-components';
import { ChangeEvent, useCallback, useEffect } from 'react';

import Textarea from 'components/common/textarea';
import Select from 'components/common/selector';
import Rating from 'components/common/rating';
import Radio from 'components/common/radio';
import { IconLock, IconLockOpen } from 'style/icon';
import { RadioGroupOptionType } from 'types/style';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  position: relative;
`;

const Stack = styled.div<{ conWid: string }>`
  width: ${({ conWid }) => conWid};
`;

const options: RadioGroupOptionType<boolean>[] = [
  {
    label: '비공개',
    value: false,
    icon: <IconLock />,
  },
  {
    label: '공개',
    value: true,
    icon: <IconLockOpen />,
  },
];

export default function CommentAddForm() {
  const dispatch = useAppDispatch();
  const { status, comment, comment_isOpen, useValidation, rating } =
    useAppSelector((state: RootState) => state.myBook);

  const onChangeRating = useCallback((rating: number) => {
    dispatch(myBookActions.setMyBookRating(rating));
  }, []);
  const onChangeStatus = useCallback((status: string) => {
    dispatch(myBookActions.setMyBookStatus(status));
  }, []);
  const onChangeCommentIsOpen = useCallback((comment_isOpen: boolean) => {
    dispatch(myBookActions.setMyBookCommentIsOpen(comment_isOpen));
  }, []);
  const onChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(myBookActions.setMyBookComment(event.target.value));
    },
    []
  );
  const initialBookState = useCallback(() => {
    dispatch(myBookActions.setInitialState());
  }, []);

  useEffect(() => {
    initialBookState();
  }, []);

  return (
    <Container>
      <Stack conWid="100%" style={{ display: 'flex' }}>
        <Radio<boolean>
          value={comment_isOpen}
          onChange={onChangeCommentIsOpen}
          options={options}
        />
      </Stack>
      <Box>
        <Stack conWid="25%">
          <Select
            label="상태"
            isValid={status === ''}
            value={status}
            onChange={onChangeStatus as (status?: string) => void}
            options={['읽는중', '다읽음', '읽기전']}
            useValidation={useValidation}
            errorMessage="상태를 선택해주세요."
          />
        </Stack>
        <Stack conWid="75%">
          <Rating
            label="평점"
            useValidation={useValidation}
            errorMessage="평점을 선택해 주세요."
            isValid={rating === 0}
            rating={rating}
            onChange={onChangeRating}
          />
        </Stack>
      </Box>
      <Textarea
        label="한줄평"
        useValidation={useValidation}
        isValid={comment === ''}
        errorMessage="한줄평을 입력해주세요."
        value={comment}
        onChange={onChangeComment}
        placeholder="이 책에대한 느낌을 설명해주세요."
      />
    </Container>
  );
}
