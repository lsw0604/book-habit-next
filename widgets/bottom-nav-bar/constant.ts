import { NavigationOption } from '@/features/navigation/model';
import { BookHeart, BookOpen, Home, Search, UserRound } from 'lucide-react';

export const BOTTOM_NAVIGATION_ITEMS: NavigationOption[] = [
  {
    label: '홈',
    href: '/',
    icon: Home,
    isAuth: false,
  },
  {
    label: '검색하기',
    href: '/search',
    icon: Search,
    isAuth: false,
  },
  {
    label: '한줄평',
    href: '/reviews',
    icon: BookOpen,
    isAuth: false,
  },
  {
    label: '나의 서재',
    href: '/my_books',
    icon: BookHeart,
    isAuth: true,
  },
  {
    label: '마이페이지',
    href: '/my_page',
    icon: UserRound,
    isAuth: true,
  },
] as const;
