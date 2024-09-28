import { usePathname } from 'next/navigation';
import {
  BookIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';

import BottomNavButton from './bottom-nav-button';

const NAVIGATION_BUTTON_OPTIONS = [
  {
    url: '/search',
    icon: <SearchIcon />,
    title: '검색하기',
    isAuth: false,
  },
  {
    url: '/comments',
    icon: <MessageCircleMoreIcon />,
    title: '한줄평',
    isAuth: false,
  },
  {
    url: undefined,
  },
  {
    url: '/my_books?status=ALL&order=desc',
    icon: <BookIcon />,
    title: '내 서재',
    isAuth: true,
  },
  {
    url: '/profile',
    icon: <UserIcon />,
    title: '마이페이지',
    isAuth: true,
  },
];

export default function Bottom() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <nav className="h-16 w-full flex items-center justify-center z-9998 fixed bottom-0 bg-slate-100 shadow-2xl rounded-t-xl">
      <ul className="flex w-full h-full cursor-pointer justify-between">
        {NAVIGATION_BUTTON_OPTIONS.map((button) => {
          if (!button.url) return <div key="palette">palette</div>;
          return <BottomNavButton key={button.title} {...button} />;
        })}
      </ul>
    </nav>
  );
}
