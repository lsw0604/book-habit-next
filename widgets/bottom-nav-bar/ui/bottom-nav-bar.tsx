'use client';

import { useCallback } from 'react';
import { useNavigation } from '@/features/navigation/lib/useNavigation';
import { BOTTOM_NAVIGATION_ITEMS } from '../model/config';
import BottomNavBtn from './bottom-nav-btn';
import { BottomItemOption } from '../model/types';

export default function BottomNavBar() {
  const { canActive, canNavigate } = useNavigation();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, option: BottomItemOption) => {
      if (!canNavigate(option.isAuth)) {
        e.preventDefault();
        /**
         * TODO 로그인이 필요하다는 모달창을 띄우는 로직 추가 예정
         */
        console.log('로그인이 필요합니다.');
      }
    },
    [canNavigate]
  );

  return (
    <nav
      role="bottom-navigation-bar"
      className="fixed bottom-0 z-50 w-full bg-gradient-to-r from-white to-gray-50 shadow-lg"
    >
      <ul className="flex h-16 w-full cursor-pointer">
        {BOTTOM_NAVIGATION_ITEMS.map(option => {
          const isActive = canActive(option.value);

          return (
            <BottomNavBtn
              key={`bottom-nav-btn-${option.label}`}
              option={option}
              isActive={isActive}
              onClick={e => handleClick(e, option)}
            />
          );
        })}
      </ul>
    </nav>
  );
}
