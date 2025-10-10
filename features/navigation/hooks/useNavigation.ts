import { usePathname } from 'next/navigation';
import { type MouseEvent, useCallback } from 'react';

import { authSelector } from '@/entities/auth';
import { useAppSelector } from '@/shared/redux';

import { NavigationOption } from '../model';

export const useNavigation = (onAuthenticated?: () => void) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector(authSelector);

  const getNavProps = useCallback(
    (option: NavigationOption) => {
      const { isAuth, href, icon, label } = option;

      const isActive =
        href === '/'
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);

      const canNavigate = !isAuth || isAuthenticated;

      const onClick = (e: MouseEvent) => {
        if (canNavigate) return;

        e.preventDefault();
        onAuthenticated?.();
      };

      return {
        href,
        isActive,
        icon,
        label,
        onClick,
      };
    },
    [pathname, isAuthenticated, onAuthenticated]
  );

  return {
    getNavProps,
  };
};
