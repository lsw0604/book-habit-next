import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import HeaderAuth from './header-auth';
import HeaderProfile from './header-profile';

import { useAppSelector } from '@/store';
import { userSelector } from '@/store/features/user/user-selector';
import { cn } from '@/utils/class-name';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged } = useAppSelector(userSelector);

  const loginHandler = (pathname: string) => {
    if (
      pathname === '/search' ||
      pathname === '/register/kakao' ||
      pathname.includes('/login/kakao')
    )
      return <div className="text-slate-500 cursor-pointer">책벌래</div>;

    return (
      <div
        className="text-slate-500 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>
    );
  };

  return (
    <header>
      {pathname === '/' ? null : (
        <nav
          className={cn(
            'fixed h-16 w-screen flex items-center justify-between py-0 px-8 z-9998 bg-slate-50 shadow-md'
          )}
        >
          {loginHandler(pathname)}
          <div className="flex justify-center items-center gap-5 h-full">
            {isLogged ? (
              pathname === '/profile' ? null : (
                <HeaderProfile />
              )
            ) : (
              <HeaderAuth />
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
