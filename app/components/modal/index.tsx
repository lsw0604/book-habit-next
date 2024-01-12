import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';

import Loader from 'components/common/Loader';
import { RootState, useAppSelector } from '@/app/store';
import SearchBookRegister from 'components/modal/searchBook/SearchBookRegister';

interface IModalComponent {
  [key: string]: ReactNode;
}

const Container = styled(motion.div)`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: auto;
  min-height: 30%;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: grid;
  background-color: ${({ theme }) => theme.mode.sub};

  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    width: 40%;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginMessage = dynamic(() => import('components/modal/login'), {
  ssr: false,
});
const CommentModifyModal = dynamic(
  () => import('components/modal/comment/CommentModify'),
  { ssr: false }
);
const CommentRegisterModal = dynamic(
  () => import('components/modal/comment/CommentRegister'),
  { ssr: false }
);
const CommentDeleteModal = dynamic(
  () => import('components/modal/comment/CommentDelete'),
  { ssr: false }
);
const HistoryRegisterModal = dynamic(
  () => import('components/modal/history/HistoryRegister'),
  { ssr: false }
);
const HistoryDeleteModal = dynamic(
  () => import('components/modal/history/HistoryDelete'),
  { ssr: false }
);
const ReplyDeleteModal = dynamic(
  () => import('components/modal/reply/ReplyDelete'),
  { ssr: false }
);
const MyBookDeleteModal = dynamic(
  () => import('components/modal/myBook/MyBookDelete'),
  { ssr: false }
);
const ProfileModifyModal = dynamic(
  () => import('components/modal/profile/ProfileModify'),
  { ssr: false }
);

const modalComponent: IModalComponent = {
  isLogin: <LoginMessage />,
  registerSearchBook: <SearchBookRegister />,
  modifyComment: <CommentModifyModal />,
  registerComment: <CommentRegisterModal />,
  deleteComment: <CommentDeleteModal />,
  registerHistory: <HistoryRegisterModal />,
  deleteHistory: <HistoryDeleteModal />,
  deleteReply: <ReplyDeleteModal />,
  deleteMyBook: <MyBookDeleteModal />,
  modifyProfile: <ProfileModifyModal />,
};

const onChangeModalComponent = (ctx?: ModalComponentType) => {
  if (ctx === undefined || !modalComponent[ctx]) return null;
  return modalComponent[ctx];
};

export default function Modal() {
  const { type } = useAppSelector((state: RootState) => state.modal);

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
      <Suspense
        fallback={
          <LoadingWrapper>
            <Loader size={2} />
          </LoadingWrapper>
        }
      >
        {onChangeModalComponent(type)}
      </Suspense>
    </Container>
  );
}
