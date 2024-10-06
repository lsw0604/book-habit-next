'use client';

import { useCallback } from 'react';

import Loader from '@/components/common/loader';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function ProfileHeader() {

  const formData = new FormData();

  const editProfileHandler = useCallback(() => {
    const inputElement: HTMLInputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        formData.append('profile', files[0]);
      }
    };
    inputElement.click();
  }, []);

  return (
    <div className="w-full absolute -top-16 flex justify-center items-center">
      <div className="w-[140px] h-[140px] flex rounded-full overflow-hidden bg-slate-50 shadow-lg justify-center items-center p-2">
        {/* <Avatar className="w-full h-full">
          <AvatarImage
            src={profile}
            alt={profile}
            onClick={editProfileHandler}
          />
          <AvatarFallback>
            <Skeleton className="w-full h-full bg-slate-200" />
          </AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
}

ProfileHeader.Loader = function () {
  return (
    <div className="w-full absolute -top-16 flex justify-center items-center">
      <div className="w-[140px] h-[140px] flex rounded-full bg-slate-50 shadow-lg justify-center items-center">
        <Loader size={2} />
      </div>
    </div>
  );
};
