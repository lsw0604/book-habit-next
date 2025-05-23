import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { BottomItemOption } from '../../model/types';
import { authSelector } from '@/entities/auth/model/store';
import { useAppSelector } from '@/shared/redux/store';

export const useBottomNav = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector(authSelector);

  const isActive = useCallback(
    (item: BottomItemOption) => {
      if (item.value === '/') return pathname === '/';
      return pathname === item.value || pathname.startsWith(item.value + '/');
    },
    [pathname]
  );

  const canNavigate = useCallback(
    (item: BottomItemOption) => {
      return !item.isAuth || isAuthenticated;
    },
    [isAuthenticated]
  );

  const handleAuthRequired = useCallback((item: BottomItemOption) => {
    // 실제로는 toast나 modal 사용
    console.log(`${item.label} 페이지는 로그인이 필요합니다.`);
  }, []);

  return {
    isActive,
    canNavigate,
    handleAuthRequired,
  };
};
