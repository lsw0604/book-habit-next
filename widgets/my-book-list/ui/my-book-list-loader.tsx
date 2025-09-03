import { MyBookItemLoader } from '@/entities/my-book/ui';
import { cn } from '@/shared/utils/class-name';

export function MyBookListLoader() {
  return (
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
      <ul
        className={cn(
          'w-full grid px-2 grid-cols-3 flex-col', // 기본 모바일 레이아웃
          'sm:grid-cols-4 sm:gap-2', // 작은 화면에서 4열로 변경
          'md:grid-cols-5 md:gap-2', // 중간 화면에서 5열로 변경
          'lg:grid-cols-6 lg:gap-2', // 큰 화면에서 6열로 변경
          'xl:grid-cols-7 xl:gap-2', // 큰 화면에서 7열로 변경
          '2xl:grid-cols-10 2xl:gap-2 2xl:max-w-screen-2xl 2xl:mx-auto' // 2xl 이상에서 최대 너비 제한
        )}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MyBookItemLoader key={index} />
        ))}
      </ul>
    </div>
  );
}
