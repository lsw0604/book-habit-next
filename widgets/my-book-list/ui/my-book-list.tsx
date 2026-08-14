'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { MyBookBoard } from './my-book-board';
import { MyBookGrid } from './my-book-grid';
import { MyBookListLoader } from './my-book-list-loader';

/** PC는 상태별 칸반 보드, 모바일은 기존 표지 그리드를 보여준다 */
export function MyBookList() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 마운트 전에는 화면 폭을 알 수 없다.
  // 여기서 섣불리 한쪽을 그리면 쓰지도 않을 뷰의 쿼리가 발생하므로 로더만 그린다.
  if (!isMounted) return <MyBookListLoader />;

  return isDesktop ? <MyBookBoard /> : <MyBookGrid />;
}
