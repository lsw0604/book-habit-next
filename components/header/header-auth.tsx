import Link from 'next/link';

import { Button } from '../ui/button';

const DROPDOWN_OPTIONS = [
  {
    label: '회원가입',
    url: '/register',
  },
  {
    label: '로그인',
    url: '/login',
  },
];

export default function HeaderAuth() {
  return (
    <div className="gap-3 items-center justify-center inline-flex">
      {DROPDOWN_OPTIONS.map((option) => (
        <div key={option.label} className="w-auto">
          <Link href={option.url}>
            <Button variant="ghost">{option.label}</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
