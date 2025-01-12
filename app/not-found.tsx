'use client';

import Link from 'next/link';

import { LogoSad } from '@/style/icon';

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <LogoSad className="w-[150px] h-[150px]" />
      <div className="w-full p-4 rounded-lg flex shadow-lg">
        <div className="w-full px-4 py-0 flex flex-col items-start justify-evenly">
          <h1 className="text-3xl text-state-500">404</h1>
          <span className="flex text-sm text-slate-400">
            해당 페이지를 찾을 수 없습니다.
          </span>
          <p className="text-slate-300">
            <Link href="/search">홈으로 가기</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
