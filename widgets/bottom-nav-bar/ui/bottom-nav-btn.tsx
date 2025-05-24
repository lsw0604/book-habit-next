'use client';

import { cn } from '@/shared/utils/class-name';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { BottomItemOption } from '../model/types';

interface BottomNavBtnProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  option: BottomItemOption;
  isActive: boolean;
  onClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    option: BottomItemOption
  ) => void;
}

const BOTTOM_NAV_BTN_STYLE = {
  base: 'w-full h-full py-1 flex flex-col gap-1 items-center justify-center',
  text: 'text-xs',
  on: 'text-gray-300 duration',
};

export default function BottomNavBtn({
  option,
  isActive,
  className,
  onClick,
  ...props
}: BottomNavBtnProps) {
  const Icon = option.icon;
  return (
    <li
      className={cn(
        BOTTOM_NAV_BTN_STYLE.base,
        isActive && BOTTOM_NAV_BTN_STYLE.on,
        'text-xxs',
        className
      )}
      {...props}
    >
      <Link onClick={e => onClick(e, option)} href={option.value}>
        {isActive && (
          <div className="absolute top-0 h-1 w-12 rounded-full bg-blue-600" />
        )}
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-1',
            isActive && 'transform scale-110 transition-transform'
          )}
        >
          <div
            className={`transition-all duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span
            className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {option.label}
          </span>
        </div>
      </Link>
    </li>
  );
}
