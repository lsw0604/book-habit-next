'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

import { RootState, useAppDispatch, useAppSelector } from 'store';
import { modalActions } from 'store/modal';

interface IProps {
  title: string;
  icon: JSX.Element;
  url: string;
  isAuth?: boolean;
}

const Container = styled.div`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.3rem 0.1rem 0.3rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.nav};
`;

const Icon = styled.div<{ $isOn: boolean }>`
  svg {
    fill: ${({ $isOn }) =>
      $isOn
        ? ({ theme }) => theme.colors.main
        : ({ theme }) => theme.mode.typo_main};
    width: 1rem;
  }
`;

const Title = styled.div<{ $isOn: boolean }>`
  color: ${({ $isOn }) =>
    $isOn
      ? ({ theme }) => theme.colors.main
      : ({ theme }) => theme.mode.typo_main};
`;

export default function NavigationButton({ title, icon, url, isAuth }: IProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLogged } = useAppSelector((state: RootState) => state.user);

  const isOn: boolean = pathname === url || pathname.startsWith(url);

  const onChangeModal = useCallback((type: ModalComponentType) => {
    dispatch(modalActions.setModalState({ type }));
  }, []);

  const onChangeUrl = (url: string) => {
    if (isAuth) {
      return isLogged ? router.push(url) : onChangeModal('isLogin');
    }
    return router.push(url);
  };

  return (
    <Container onClick={() => onChangeUrl(url)}>
      <Icon $isOn={isOn}>{icon}</Icon>
      <Title $isOn={isOn}>{title}</Title>
    </Container>
  );
}
