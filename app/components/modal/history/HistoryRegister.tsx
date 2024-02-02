'use client';

import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import RadioButton from 'components/common/radio/RadioButton';
import MyBookDetailDateSelector from 'components/myBookDetail/MyBookDetailDateSelector';
import { RadioGroupOptionType } from 'types/style';
import useMyBookPageQueries from 'queries/myBook/useMyBookPageQueries';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { myBookActions } from '@/app/store/myBook';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Stack = styled.div<{ isStatus?: boolean }>`
  position: relative;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '읽기 시작한 날',
    value: '읽기시작함',
    description: '책을 읽기 시작했어요.',
  },
  {
    label: '읽은 날',
    value: '읽는중',
    description: '책을 읽었어요.',
  },
  {
    label: '다 읽은 날',
    value: '다읽음',
    description: '책을 다 읽었어요.',
  },
];

export default function HistoryAddForm() {
  const dispatch = useAppDispatch();
  const { date, status, useValidation, users_books_id } = useAppSelector(
    (state: RootState) => state.myBook
  );
  const { myBookTimeData } = useMyBookPageQueries(users_books_id as number);

  const startDate = myBookTimeData?.startDate
    ? new Date(dayjs(myBookTimeData.startDate).add(9, 'hour').toISOString())
    : null;

  const endDate = myBookTimeData?.endDate
    ? new Date(dayjs(myBookTimeData.endDate).add(9, 'hour').toISOString())
    : null;

  const onChangeMyBookDate = useCallback((date: Date | null) => {
    // dispatch(myBookActions.setMyBookDate(date));
  }, []);
  const onChangeMyBookStatus = useCallback((status: string) => {
    dispatch(myBookActions.setMyBookStatus(status));
  }, []);

  useEffect(() => {
    dispatch(myBookActions.setMyBookComment(''));
    dispatch(myBookActions.setMyBookCommentId(undefined));
    dispatch(myBookActions.setMyBookRating(0));
    dispatch(myBookActions.setMyBookStatus(''));
    dispatch(myBookActions.setMyBookUseValidation(false));
  }, []);

  return (
    <Container>
      <Stack>
        <RadioButton<string>
          label="독서 기록 상태를 선택해주세요."
          options={options}
          value={status}
          onChange={onChangeMyBookStatus}
          errorMessage="상태를 선택해주세요."
          isValid={status === ''}
          useValidation={useValidation}
        />
      </Stack>
      <Content>
        <Stack>
          {/* <MyBookDetailDateSelector
            startDate={startDate}
            onChange={(e) => onChangeMyBookDate(e)}
            date={date}
            endDate={endDate}
            errorMessage="날짜를 입력해주세요."
            isValid={date === null}
            useValidation={useValidation}
          /> */}
        </Stack>
      </Content>
    </Container>
  );
}
