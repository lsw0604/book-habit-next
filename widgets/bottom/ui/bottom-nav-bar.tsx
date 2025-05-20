import BottomNavBtn from './bottom-nav-btn';

const NAVIGATION_BOTTOM_OPTIONS = [
  {
    label: '홈',
    value: '/',
    isAuth: false,
  },
  {
    label: '한줄평',
    value: '/reviews',
    isAuth: false,
  },
  {
    label: '나의 서재',
    value: '/my_books',
    isAuth: true,
  },
  {
    label: '마이페이지',
    value: '/my_page',
    isAuth: true,
  },
];

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 z-9998 flex h-16 w-full items-center justify-center rounded-t-xl bg-white shadow-lg border-t border-gray-200 md:hidden">
      <ul className="flex w-full h-full cursor-pointer justify-between">
        {NAVIGATION_BOTTOM_OPTIONS.map(option => (
          <BottomNavBtn
            key={`btn-${option.label}`}
            isAuth={option.isAuth}
            label={option.label}
            value={option.value}
          />
        ))}
      </ul>
    </nav>
  );
}
