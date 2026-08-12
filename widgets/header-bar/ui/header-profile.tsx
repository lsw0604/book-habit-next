import type { User } from '@/entities/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';

interface HeaderProfileProps {
  user: User;
}

export function HeaderProfile({ user }: HeaderProfileProps) {
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
