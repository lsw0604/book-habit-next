import { cn } from '@/shared/utils/class-name';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface BottomNavBtnProps extends HTMLAttributes<HTMLLIElement> {
  label: string;
  value: string;
  isAuth: boolean;
  className?: string;
}

export default function BottomNavBtn({
  label,
  value,
  isAuth,
  className,
  ...props
}: BottomNavBtnProps) {
  return (
    <li
      className={cn(
        'className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]',
        className
      )}
      {...props}
    >
      <Link href={value}>
        <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
          <p className="">{label}</p>
        </div>
      </Link>
    </li>
  );
}
