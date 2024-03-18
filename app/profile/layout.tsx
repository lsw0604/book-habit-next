'use client';

import { ReactNode, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProfileDescription from './_components/profile-description';
import ProfileHeader from './_components/profile-header';

export default function ProfileLayout({
  like,
  reply,
  calendar,
  children,
}: {
  like: ReactNode;
  reply: ReactNode;
  calendar: ReactNode;
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const profileType = useMemo(() => {
    return searchParams.get('type') !== null
      ? (searchParams.get('type') as string)
      : undefined;
  }, [searchParams]) as 'like' | 'reply' | 'calendar';

  const SwitchComponent = (type?: 'like' | 'reply' | 'calendar') => {
    switch (type) {
      case 'like':
        return like;
      case 'reply':
        return reply;
      case 'calendar':
        return calendar;
      default:
        return children;
    }
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="w-full absolute flex flex-col bottom-0 rounded-t-xl h-[90%] gap-4 bg-white">
        <ProfileHeader />
        <div className="w-full h-full flex flex-col px-4 pt-20 pb-4">
          <ProfileDescription />
          <button onClick={() => router.push('/profile?type=like')}>
            like
          </button>
          <button onClick={() => router.push('/profile?type=reply')}>
            reply
          </button>
          <button onClick={() => router.push('/profile?type=calendar')}>
            calendar
          </button>
          <button onClick={() => router.push('/profile')}>page</button>
          <div className="w-full h-full flex flex-col overflow-auto relative gap-4">
            {SwitchComponent(profileType)}
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-slate-500" />
    </div>
  );
}
