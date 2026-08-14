import Link from 'next/link';

import { useSession } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';

import { HeaderAuth } from './header-auth';
import { HeaderProfile } from './header-profile';

function HeaderStatus() {
  const { data: user, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  if (user) return <HeaderProfile user={user} />;

  return <HeaderAuth />;
}

export function HeaderBar() {
  return (
    <header className="h-16 w-full shrink-0 border-b bg-background">
      <nav className="container flex h-full w-full items-center justify-between">
        <Link href="/" className="text-lg font-bold text-foreground">
          Book Habit
        </Link>
        <div>
          <HeaderStatus />
        </div>
      </nav>
    </header>
  );
}
