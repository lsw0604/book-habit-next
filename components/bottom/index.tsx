import {
  BookIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import BottomNavButton from './bottom-nav-button';

const BOTTOM_BUTTON_OPTIONS = [
  {
    title: '검색하기',
    icon: <SearchIcon />,
    url: '/search',
    isAuth: false,
  },
  {
    title: '한줄평',
    icon: <MessageCircleMoreIcon />,
    url: '/comments',
    isAuth: false,
  },
  { component: <div>bottom</div> },
  {
    title: '내 서재',
    icon: <BookIcon />,
    url: '/my_books',
    isAuth: true,
  },
  {
    title: '내 프로필',
    icon: <UserIcon />,
    url: '/profile',
    isAuth: true,
  },
];

export default function Bottom() {
  const pathname = usePathname();

  if (pathname === '/') return null;
  return (
    <nav className="h-16 w-full flex items-center justify-center z-9998 fixed bottom-0 bg-slate-50 shadow-2xl rounded-t-xl">
      <ul className="flex w-full h-full cursor-pointer justify-between">
        {BOTTOM_BUTTON_OPTIONS.map((option) => (
          <li
            key={option.title}
            className="w-full h-full first:overflow-hidden first:rounded-[1rem_0_0_0] last:overflow-hidden last:rounded-[0_1rem_0_0]"
          >
            {option.component ? (
              option.component
            ) : (
              <BottomNavButton {...option} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
