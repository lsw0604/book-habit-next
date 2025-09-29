import Link from 'next/link';

import { Button } from '@/shared/ui/button';

export function HeaderAuth() {
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost">
        <Link href="/login">로그인</Link>
      </Button>
      <Button asChild>
        <Link href="/register">회원가입</Link>
      </Button>
    </div>
  );
}
