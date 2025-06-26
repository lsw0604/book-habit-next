import type { NavigationBtnProps } from '@/features/navigation/model';
import Link from 'next/link';
import { cn } from '@/shared/utils/class-name';

export default function BottomNavBtn({
  isActive,
  onClick,
  href,
  icon,
  label,
}: NavigationBtnProps) {
  const Icon = icon;

  return (
    <li className="relative w-full h-full py-2">
      <Link href={href} onClick={onClick} className="w-full h-full">
        {isActive && (
          <div className="absolute top-0 left-0 h-1 w-full">
            <div className="w-12 h-full rounded-full bg-black mr-auto ml-auto" />
          </div>
        )}
        <div
          className={cn(
            'w-full h-full flex flex-col items-center text-gray-500',
            isActive && 'text-black duration-200 scale-110'
          )}
        >
          <Icon className="w-6 h-6 mt-1" />
          <span className="text-xs font-medium">{label}</span>
        </div>
      </Link>
    </li>
  );
}
