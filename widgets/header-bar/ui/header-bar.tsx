import Link from 'next/link';

import { authSelector } from '@/entities/auth';
import { useAppSelector } from '@/shared/redux/store';

import { HeaderAuth } from './header-auth';
import { HeaderProfile } from './header-profile';

export function HeaderBar() {
  const { isAuthenticated } = useAppSelector(authSelector);

  return (
    <header className="fixed top-0 z-50 h-16 w-screen border-b bg-background">
      <nav className="container flex h-full w-full items-center justify-between">
        <Link href="/" className="text-lg font-bold text-foreground">
          Book Habit
        </Link>
        <div>{isAuthenticated ? <HeaderProfile /> : <HeaderAuth />}</div>
      </nav>
    </header>
  );
}
