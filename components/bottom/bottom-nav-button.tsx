'use client';

import Link from 'next/link';
import { useHover } from 'usehooks-ts';
import { MouseEvent, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { RootState, useAppSelector } from '@/app/store';

interface BottomNavButtonProps {
  title: string;
  icon: JSX.Element;
  url: string;
  isAuth: boolean;
}

export default function BottomNavButton({
  title,
  icon,
  url,
  isAuth,
}: BottomNavButtonProps) {
  const pathname = usePathname();
  const { isLogged } = useAppSelector((state: RootState) => state.user);

  const itemRef = useRef<HTMLLIElement | null>(null);
  const isHover = useHover(itemRef);

  const isOn =
    pathname === url || pathname.startsWith(url) || url.startsWith(pathname);

  const navigateHandler = (e: MouseEvent) => {
    if (isAuth && !isLogged) {
      e.preventDefault();
      console.log('need Login');
    }
  };

  return (
    <li
      ref={itemRef}
      className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]"
    >
      <Link href={url}>
        <div
          onClick={navigateHandler}
          className={cn(
            'w-full h-full border-none outline-none flex flex-col justify-around items-center',
            isOn && 'text-slate-400'
          )}
        >
          <div className={cn(isHover && 'relative animate-bounce top-2')}>
            {icon}
          </div>
          <p className={cn(isOn && 'font-bold')}>{title}</p>
        </div>
      </Link>
    </li>
  );
}
