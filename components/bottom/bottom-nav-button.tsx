'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavButtonProps {
  title: string;
  icon: JSX.Element;
  url: string;
  isAuth?: boolean;
}

export default function BottomNavButton({
  title,
  icon,
  url,
  isAuth,
}: BottomNavButtonProps) {
  const pathname = usePathname();
  return (
    <Link href={url}>
      <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
        <div>{icon}</div>
        <div className={cn(pathname === url && 'text-cyan-300')}>{title}</div>
      </div>
    </Link>
  );
}
