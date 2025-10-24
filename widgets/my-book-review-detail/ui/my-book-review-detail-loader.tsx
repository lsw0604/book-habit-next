import { Skeleton } from '@/shared/ui/skeleton';

export function MyBookReviewDetailLoader() {
  return (
    <div className="px-2 py-4 border rounded-lg shadow-lg space-y-2">
      <Skeleton className="w-full h-[24px]" />
      <Skeleton className="w-full h-[24px]" />
      <Skeleton className="w-full h-[24px]" />
    </div>
  );
}
