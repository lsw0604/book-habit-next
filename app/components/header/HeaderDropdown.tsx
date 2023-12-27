'use client';

import styled from 'styled-components';
import { useRouter } from 'next/router';

import { customize } from 'style/colors';
import { logoutAPI } from 'lib/api/auth';
import useToastHook from '@/hooks/useToastHook';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import { userActions } from 'store/user';
import { modalActions } from 'store/modal';

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  top: 3.5rem;
  right: 2rem;
  display: flex;
  padding: 0.1rem;
  margin-top: 0.8rem;
  flex-direction: column;
  width: 10rem;
  height: auto;
  border-width: 1px;
  border-color: ${customize.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mode.main};
  box-shadow: ${({ theme }) => theme.shadow.xl};
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Li = styled.li`
  border-radius: 0.5rem;
  padding: 10px;
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.mode.typo_sub};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_URI}`;

export default function HeaderProfileDropdown() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const router = useRouter();

  const { provider } = useAppSelector((state: RootState) => state.user);
  const setUserInitialState = () => dispatch(userActions.setUserInitialState());
  const setModalState = (type: ModalComponentType) =>
    dispatch(modalActions.setModalState({ type }));

  const modifyModalOpen = () => setModalState('modifyProfile');

  const navigateSearchUrl = () => router.push('/search');

  const navigateMyBookUrl = () => router.push('/my_books');

  const openWindow = () => window.open(KAKAO_LOGOUT_URL, '_self');

  const handleLogout = async () => {
    if (provider === 'kakao') {
      openWindow();
    }
    const { message, status } = await logoutAPI();

    setUserInitialState();
    window.localStorage.removeItem('ACCESS');
    addToast({ message, status });
  };

  const DROPDOWN_OPTIONS = [
    {
      label: '나의 서재',
      onClick: navigateMyBookUrl,
    },
    {
      label: '책 검색하기',
      onClick: navigateSearchUrl,
    },
    {
      label: '프로필 수정',
      onClick: modifyModalOpen,
    },
    {
      label: '로그아웃',
      onClick: handleLogout,
    },
  ];

  return (
    <Container>
      <Ul>
        {DROPDOWN_OPTIONS.map((option) => (
          <Li onClick={option.onClick} key={option.label}>
            <Label>
              <span>{option.label}</span>
            </Label>
          </Li>
        ))}
      </Ul>
    </Container>
  );
}
