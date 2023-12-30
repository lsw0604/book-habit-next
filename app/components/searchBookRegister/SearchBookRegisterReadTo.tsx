import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { LogoHeart } from 'style/icon';
import { useAppDispatch } from 'store';
import { searchBookRegisterActions } from 'store/searchBookRegister';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 74px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
  svg {
    height: 100%;
  }
`;

const Message = styled.h1`
  font-size: 25px;
  display: flex;
  flex-direction: column;
  span {
    font-size: 20px;
    line-height: 22px;
  }
`;

export default function ToRead() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(searchBookRegisterActions.setSearchBookInitialState());
    };
  }, []);

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
      <Content>
        <LogoHeart />
        <Message>
          <span>읽지는 않았지만</span>
          <span>관심있는 책이에요.</span>
        </Message>
      </Content>
    </Container>
  );
}
