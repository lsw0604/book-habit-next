'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Loader from '@/components/common/loader';
import { LogoMain } from '@/style/icon';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/search');
    }, 1000);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center gap-2 flex-col">
      <div className="w-full flex justify-center">
        <i className="w-40">
          <LogoMain />
        </i>
      </div>
      <h2 className="flex text-lg">부담없이 기록하는 독서기록장</h2>
      <h1 className="text-4xl text-center">책벌래</h1>
      <div className="w-full h-[10%] flex justify-center items-center">
        <Loader size={2} />
      </div>
    </div>
  );
}
