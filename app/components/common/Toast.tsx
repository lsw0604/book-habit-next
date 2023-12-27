'use client';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import IconButton from 'components/common/button/IconButton';
import {
  IconError,
  IconInfo,
  IconSuccess,
  IconWarning,
  IconClose,
} from 'style/icon';
import useToastHook from '@/hooks/useToastHook';

const Container = styled.div`
  width: 100%;
  position: fixed;
  margin-top: 10px;
  top: 1rem;
  height: auto;
  z-index: 9999;
  padding: 0 1rem;
  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Item = styled(motion.div)`
  width: 100%;
  padding: 0.5rem 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow.xxl};
  @media screen and (min-width: 1280px) {
    width: 40%;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
`;

const IconWrapper = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.colors.main};
  }
`;

const icons = {
  success: <IconSuccess />,
  error: <IconError />,
  warning: <IconWarning />,
  info: <IconInfo />,
};

const toastVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Toast() {
  const { toast, deleteToast } = useToastHook();

  return (
    <Container>
      <AnimatePresence>
        {toast &&
          toast.map((toast) => (
            <Item
              key={toast.id}
              variants={toastVariants}
              initial="initial"
              exit="exit"
              animate="animate"
            >
              {toast.status !== '' && (
                <IconWrapper>{icons[toast.status]}</IconWrapper>
              )}
              <Span>{toast.message}</Span>
              <IconButton
                mode="text"
                onClick={() => deleteToast({ id: toast.id })}
                icon={<IconClose />}
              >
                Icon_btn
              </IconButton>
            </Item>
          ))}
      </AnimatePresence>
    </Container>
  );
}
