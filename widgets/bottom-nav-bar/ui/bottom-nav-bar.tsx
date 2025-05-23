'use client';

import { useNavigation } from '@/features/navigation/lib/useNavigation';
import { BOTTOM_NAVIGATION_ITEMS } from '../model/config';
import BottomNavBtn from './bottom-nav-btn';

export default function BottomNavBar() {
  const { canActive, canNavigate } = useNavigation();

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
              canNavigate={canNavigate(option.isAuth)}
            />
          );
        })}
      </ul>
    </nav>
  );
}
