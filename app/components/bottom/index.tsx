'use client';

import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import BottomNavigationPaletteButton from 'components/bottom/NavigationPaletteButton';
import BottomNavigationButton from 'components/bottom/NavigationButton';
import { IconBook, IconComments, IconPerson, IconSearch } from 'style/icon';

const Container = styled.nav`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  position: fixed;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  background-color: ${({ theme }) => theme.mode.nav};
`;

const Buttons = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  justify-content: space-between;
`;

const Wrapper = styled.li`
  width: 100%;
  height: 100%;
  &:first-child {
    border-radius: 1rem 0 0 0;
    overflow: hidden;
  }
  &:last-child {
    border-radius: 0 1rem 0 0;
    overflow: hidden;
  }
`;

const BOTTOM_BUTTON_OPTIONS = [
  { title: '검색하기', icon: <IconSearch />, url: '/search', isAuth: false },
  { title: '한줄평', icon: <IconComments />, url: '/comments', isAuth: false },
  { component: <BottomNavigationPaletteButton /> },
  { title: '내 서재', icon: <IconBook />, url: '/my_books', isAuth: true },
  { title: '내 프로필', icon: <IconPerson />, url: '/profile', isAuth: true },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return pathname !== '/' ? (
    <Container>
      <Buttons>
        {BOTTOM_BUTTON_OPTIONS.map((option, index) => (
          <Wrapper key={index}>
            {option.component ? (
              option.component
            ) : (
              <BottomNavigationButton
                title={option.title}
                icon={option.icon}
                url={option.url}
                isAuth={option.isAuth}
              />
            )}
          </Wrapper>
        ))}
      </Buttons>
    </Container>
  ) : null;
}
