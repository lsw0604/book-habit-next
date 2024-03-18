'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import useProfileEditMutation from '@/queries/profile/useProfileEditMutation';
import { useCallback } from 'react';
import { RootState, useAppSelector } from 'store';

export default function ProfileHeader() {
  const { profile } = useAppSelector((state: RootState) => state.user);

  const formData = new FormData();

  const { mutate, isLoading } = useProfileEditMutation();

  const editProfileHandler = useCallback(() => {
    const inputElement: HTMLInputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        formData.append('profile', files[0]);
        mutate(formData);
      }
    };
    inputElement.click();
  }, []);

  if (isLoading) return <ProfileHeader.Loader />;

  return (
    <div className="w-full absolute -top-16 flex justify-center items-center">
      <Avatar className="w-[140px] h-[140px]">
        <AvatarImage src={profile} alt={profile} onClick={editProfileHandler} />
        <AvatarFallback>
          <Skeleton className="w-full h-full bg-slate-200" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

ProfileHeader.Loader = function () {
  return (
    <div className="w-full absolute -top-16 flex justify-center items-center">
      <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-slate-50">
        <Skeleton className="w-full h-full bg-slate-200" />
      </div>
    </div>
  );
};
