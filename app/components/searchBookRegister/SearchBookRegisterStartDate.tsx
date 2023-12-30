'use client';

import styled from 'styled-components';
import DatePicker from 'components/common/DatePicker';
import ErrorMessage from 'components/common/message/ErrorMessage';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { useCallback } from 'react';
import { bookRegisterActions } from '@/app/store/bookRegister';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;

  input {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    border: 0;
    border-radius: 12px;
    font-weight: 700;
    outline: none;
    cursor: pointer;
  }
`;

const Heading = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

export default function SearchBookRegisterStartDate({
  errorMessage,
}: IBottomDateSelector) {
  const dispatch = useAppDispatch();

  const { startDate, endDate, useValidation } = useAppSelector(
    (state: RootState) => state.bookRegister
  );

  const onChange = useCallback((date: Date | null) => {
    dispatch(bookRegisterActions.setBookRegisterStartDate(date));
  }, []);

  return (
    <>
      <Heading>책 읽기 시작한 날</Heading>
      <Container>
        <DatePicker
          onChange={onChange}
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate || new Date()}
          isClearable
        />
      </Container>
      {errorMessage && !startDate && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
