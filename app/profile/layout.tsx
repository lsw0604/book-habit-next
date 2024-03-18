'use client';

import { ReactNode } from 'react';

import ProfileDescription from './_components/profile-description';
import ProfileHeader from './_components/profile-header';

export default function ProfileLayout({
  like,
  reply,
  calendar,
}: {
  like: ReactNode;
  reply: ReactNode;
  calendar: ReactNode;
}) {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="w-full absolute flex flex-col bottom-0 rounded-t-xl h-[90%] gap-4 bg-white">
        <ProfileHeader />
        <div className="w-full h-full flex flex-col px-4 pt-20 pb-4">
          <ProfileDescription />
          <div className="w-full h-full flex flex-col overflow-auto relative gap-4">
            {like}
            {reply}
            {calendar}
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-slate-500" />
    </div>
  );
}
