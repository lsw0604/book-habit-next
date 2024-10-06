import { useState, useRef } from 'react';
import { v4 } from 'uuid';
import { useOnClickOutside } from 'usehooks-ts';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

import { useAppSelector } from '@/store';
import { userSelector } from '@/store/features/user/user-selector';

export default function HeaderProfile() {
  const { profile, name } = useAppSelector(userSelector);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const dropdownHandler = () => setIsOpen((prev) => !prev);

  useOnClickOutside(profileRef, () => setIsOpen(false));

  return (
    <div
      ref={profileRef}
      onClick={dropdownHandler}
      className="h-full flex flex-row gap-2 items-center cursor-pointer text-slate-500"
    >
      {name && <p>{name} 님 환영합니다.</p>}
      <Avatar>
        <AvatarImage src={profile} alt={v4()} />
        <AvatarFallback>
          <Skeleton className="w-full h-full bg-slate-200" />
        </AvatarFallback>
      </Avatar>
      {/* {isOpen && <HeaderDropdown />} */}
    </div>
  );
}
