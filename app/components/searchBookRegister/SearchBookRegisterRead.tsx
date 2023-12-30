'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';

import StartDate from 'components/searchBookRegister/SearchBookRegisterStartDate';
import EndDate from 'components/searchBookRegister/SearchBookRegisterEndDate';

import { RootState, useAppDispatch, useAppSelector } from 'store';
import { bookRegisterActions } from 'store/bookRegister';

const Container = styled(motion.div)`
  width: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export default function Read() {
  const dispatch = useAppDispatch();
  const { endDate, startDate, useValidation } = useAppSelector(
    (state: RootState) => state.bookRegister
  );

  const onChangeStartDate = useCallback((date: Date | null) => {
    dispatch(bookRegisterActions.setBookRegisterStartDate(date));
  }, []);

  const onChangeEndDate = useCallback((date: Date | null) => {
    dispatch(bookRegisterActions.setBookRegisterEndDate(date));
  }, []);

  useEffect(() => {
    dispatch(bookRegisterActions.setBookRegisterInitialState());
  }, []);

  useEffect(() => {
    dispatch(bookRegisterActions.setBookRegisterUseValidate(false));
  }, [startDate, endDate]);

  return (
    <Container
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
    >
      <Box>
        <Stack>
          <StartDate isValid={!startDate} errorMessage="날짜를 입력해주세요." />
        </Stack>
        <Stack>
          <EndDate isValid={!endDate} errorMessage="날짜를 입력해주세요." />
        </Stack>
      </Box>
    </Container>
  );
}
