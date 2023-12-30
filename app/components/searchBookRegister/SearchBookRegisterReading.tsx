'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import SearchBookRegisterStartDate from 'components/searchBookRegister/SearchBookRegisterStartDate';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { bookRegisterActions } from 'store/bookRegister';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export default function Reading() {
  const dispatch = useAppDispatch();
  const { startDate, useValidation } = useAppSelector(
    (state: RootState) => state.bookRegister
  );

  useEffect(() => {
    return () => {
      dispatch(bookRegisterActions.setBookRegisterInitialState());
    };
  }, []);

  useEffect(() => {
    if (useValidation) {
      dispatch(bookRegisterActions.setBookRegisterUseValidate(false));
    }
  }, [startDate]);

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
      <Stack>
        <SearchBookRegisterStartDate errorMessage="읽기 시작한 날짜를 입력해주세요." />
      </Stack>
    </Container>
  );
}
