'use client';

import styled from 'styled-components';
import SearchRegisterHeader from 'components/searchBookRegister/SearchBookRegisterHeader';
import SearchRegister from 'components/searchBookRegister';
import ModalHeader from 'components/modal/ModalHeader';
import { IconBook } from 'style/icon';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: space-between;
`;

const HEADER_OPTION = {
  icon: <IconBook />,
  title: '내 서재에 책을 등록해요.',
  sub: '등혹할 책의 상태와 날짜를 입력해주세요.',
};

export default function SearchBookRegister() {
  return (
    <Container>
      <ModalHeader {...HEADER_OPTION} />
      <SearchRegisterHeader />
      <SearchRegister />
    </Container>
  );
}
