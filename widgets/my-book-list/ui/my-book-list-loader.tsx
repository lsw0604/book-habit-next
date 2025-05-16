import { cn } from '@/shared/utils/class-name';
import MyBookItemLoader from './my-book-item-loader';

export default function MyBookListLoader() {
  return (
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
      <ul
        className={cn(
          'w-full grid px-2 grid-cols-3 flex-col', // 기본 모바일 레이아웃
          'sm:grid-cols-4 sm:gap-2', // 작은 화면에서 4열로 변경
          'md:grid-cols-5 md:gap-2', // 중간 화면에서 5열로 변경
          'lg:grid-cols-6 lg:gap-2', // 큰 화면에서 6열로 변경
          'xl:grid-cols-7 xl:gap-2', // 큰 화면에서 7열로 변경
          '2xl:grid-cols-10 2xl:gap-2' // 큰 화면에서 10열로 변경
        )}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <MyBookItemLoader key={index} />
        ))}
      </ul>
    </div>
  );
}
