'use client';

import { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

import { myBookActions } from 'store/myBook';
import { RootState, useAppDispatch, useAppSelector } from 'store';
import useThemeHook from '@/hooks/useThemeHook';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
  background-color: ${({ theme }) => theme.mode.main};
`;

const Color = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 1rem;
`;

export default function Home() {
  const { comment } = useAppSelector((state: RootState) => state.myBook);
  const dispatch = useAppDispatch();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(myBookActions.setMyBookComment(event.target.value));
  }, []);

  const onClick = () => {
    dispatch(myBookActions.setInitialState());
  };

  const { colorHandler, themeHandler } = useThemeHook();

  return (
    <main>
      <Container>
        <Color />
        <input value={comment} onChange={onChange} />
        <button onClick={onClick}>reset</button>
        <button onClick={themeHandler}>DarkMode</button>
        <button onClick={themeHandler}>LightMode</button>
        <button onClick={() => colorHandler('cyan')}>Cyan</button>
        <button onClick={() => colorHandler('fuchsia')}>fuchsia</button>
      </Container>
    </main>
  );
}
