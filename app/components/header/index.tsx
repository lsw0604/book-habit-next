'use client';

import styled, { css } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';

import HeaderAuth from 'components/header/HeaderAuth';
import HeaderProfile from 'components/header/HeaderProfile';
import { RootState, useAppSelector } from 'store';
import { IconLeftArrow } from 'style/icon';

const headerCSSHandler = (isUriProfile: boolean) => {
  return !isUriProfile
    ? css`
        background-color: ${({ theme }) => theme.mode.sub};
        box-shadow: ${({ theme }) => theme.shadow.md};
      `
    : css`
        background-color: ${({ theme }) => theme.colors.spinner};

        @media screen and (min-width: 1280px) {
          background-color: ${({ theme }) => theme.mode.sub};
          box-shadow: ${({ theme }) => theme.shadow.md};
        }
      `;
};

const Container = styled.nav<{ $isUriProfile: boolean }>`
  position: fixed;
  height: 4rem;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 9998;
  ${({ $isUriProfile }) => headerCSSHandler($isUriProfile)}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_main};
  svg {
    width: 1rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged } = useAppSelector((state: RootState) => state.user);

  const logoHandler = (pathname: string) => {
    if (
      pathname === '/search' ||
      pathname === '/register/kakao' ||
      pathname.includes('/login/kakao')
    )
      return <LogoWrapper>책벌래</LogoWrapper>;

    return (
      <LogoWrapper onClick={() => router.back()}>
        <IconLeftArrow />
      </LogoWrapper>
    );
  };

  return (
    <header>
      {pathname !== '/' && (
        <Container $isUriProfile={pathname === '/profile'}>
          {logoHandler(pathname)}
          <Wrapper>
            {isLogged ? (
              pathname === '/profile' ? null : (
                <HeaderProfile />
              )
            ) : (
              <HeaderAuth />
            )}
          </Wrapper>
        </Container>
      )}
    </header>
  );
}
