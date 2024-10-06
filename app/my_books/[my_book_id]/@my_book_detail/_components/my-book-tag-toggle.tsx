import { cn } from '@/utils/class-name';
import { ChevronDownIcon } from 'lucide-react';

interface MyBookTagToggleProps {
  openTag: boolean;
  openTagHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function MyBookTagToggle({
  openTag,
  openTagHandler,
}: MyBookTagToggleProps) {
  return (
    <div className="flex">
      <div
        className={cn(
          'flex h-full bg-popover opacity-50',
          openTag ? 'items-end' : 'items-center'
        )}
      >
        <div className="flex gap-1 p-1 cursor-pointer" onClick={openTagHandler}>
          <ChevronDownIcon
            className={cn(
              'w-4 h-4 opacity-50',
              openTag ? 'rotate-180' : 'rotate-0'
            )}
          />
        </div>
      </div>
    </div>
  );
}
