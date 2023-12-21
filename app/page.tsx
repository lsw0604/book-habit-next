'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { RootState, useAppDispatch, useAppSelector } from './store';
import { ChangeEvent, useCallback } from 'react';
import { myBookActions } from './store/myBook';

export default function Home() {
  const { comment } = useAppSelector((state: RootState) => state.myBook);
  const dispatch = useAppDispatch();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(myBookActions.setMyBookComment(event.target.value));
  }, []);

  const onClick = () => {
    dispatch(myBookActions.setInitialState());
  };

  return (
    <main className={styles.main}>
      <input value={comment} onChange={onChange} />
      <button onClick={onClick}>reset</button>
    </main>
  );
}
