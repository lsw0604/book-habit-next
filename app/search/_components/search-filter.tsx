import { cn } from '@/lib/utils';

export default function SearchFilter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        className
      )}
    >
      <div>Search Filter</div>
    </div>
  );
}
