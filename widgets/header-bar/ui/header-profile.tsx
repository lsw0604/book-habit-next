import { authSelector } from '@/entities/auth';
import { useAppSelector } from '@/shared/redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Skeleton } from '@/shared/ui/skeleton';

export function HeaderProfile() {
  const { user } = useAppSelector(authSelector);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex cursor-pointer items-center gap-2">
      <p className="text-sm font-medium text-gray-700">{user.name}님</p>
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.profile} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
