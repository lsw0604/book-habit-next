import { BookHeart, BookOpen, Home, Search, UserRound } from 'lucide-react';

export const BOTTOM_NAVIGATION_ITEMS = [
  {
    label: '홈',
    value: '/',
    icon: Home,
    isAuth: false,
  },
  {
    label: '검색하기',
    value: '/search',
    icon: Search,
    isAuth: false,
  },
  {
    label: '한줄평',
    value: '/reviews',
    icon: BookOpen,
    isAuth: false,
  },
  {
    label: '나의 서재',
    value: '/my_books',
    icon: BookHeart,
    isAuth: true,
  },
  {
    label: '마이페이지',
    value: '/my_page',
    icon: UserRound,
    isAuth: true,
  },
] as const;
