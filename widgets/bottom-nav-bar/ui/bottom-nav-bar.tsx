'use client';

import { useNavigation } from '@/features/navigation/hooks';

import { BOTTOM_NAVIGATION_ITEMS } from '../constant';

import { BottomNavBtn } from './bottom-nav-btn';

export function BottomNavBar() {
  const onAuthenticated = () => {
    /**
     * TODO : 로그인이 필요하다는 모달창 띄우기
     */
    console.log('로그인이 필요합니다.');
  };

  const { getNavProps } = useNavigation(onAuthenticated);

  return (
    <nav
      role="navigation"
      className="fixed bottom-0 z-50 w-full bg-gradient-to-r from-white to-gray-50 shadow-lg"
    >
      <ul className="flex h-16 w-full cursor-pointer">
        {BOTTOM_NAVIGATION_ITEMS.map(option => (
          <BottomNavBtn
            key={`bottom-nav-bar-${option.href}`}
            {...getNavProps(option)}
          />
        ))}
      </ul>
    </nav>
  );
}
