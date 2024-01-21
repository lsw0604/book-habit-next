import {
  BookIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import BottomNavButton from './bottom-nav-button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Bottom() {
  const pathname = usePathname();

  if (pathname === '/') return null;
  return (
    <nav className="h-16 w-full flex items-center justify-center z-9998 fixed bottom-0 bg-slate-50 shadow-2xl rounded-t-xl">
      <ul className="flex w-full h-full cursor-pointer justify-between">
        <li className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]">
          <Link href="/search">
            <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
              <div>
                <SearchIcon
                  className={cn(pathname === '/search' && 'text-cyan-300')}
                />
              </div>
              <div className={cn(pathname === '/search' && 'text-cyan-300')}>
                검색하기
              </div>
            </div>
          </Link>
        </li>
        <li className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]">
          <Link href="/comments">
            <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
              <div>
                <MessageCircleMoreIcon
                  className={cn(pathname === '/comments' && 'text-cyan-300')}
                />
              </div>
              <div className={cn(pathname === '/comments' && 'text-cyan-300')}>
                한줄평
              </div>
            </div>
          </Link>
        </li>
        <li className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]">
          <div>palette</div>
        </li>
        <li className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]">
          <Link href="/my_books">
            <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
              <div>
                <BookIcon
                  className={cn(pathname === '/my_books' && 'text-cyan-300')}
                />
              </div>
              <div className={cn(pathname === '/my_books' && 'text-cyan-300')}>
                내 서재
              </div>
            </div>
          </Link>
        </li>
        <li className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]">
          <Link href="/profile">
            <div className="w-full h-full border-none outline-none flex flex-col justify-around items-center">
              <UserIcon
                className={cn(pathname === '/profile' && 'text-cyan-300')}
              />
              <div className={cn(pathname === '/profile' && 'text-cyan-300')}>
                내 프로필
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
