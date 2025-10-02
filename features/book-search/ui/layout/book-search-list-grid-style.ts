import { cn } from '@/shared/utils';

// 이 스타일은 이제 book-search 기능에 국한됩니다.
export const BOOK_SEARCH_LIST_GRID_STYLE = cn(
  'grid w-full grid-cols-1 gap-4',
  'md:grid-cols-2',
  'lg:grid-cols-3',
  'xl:grid-cols-4',
  '2xl:grid-cols-5'
);
