import { Skeleton } from '@/components/ui/skeleton';

export default function MyBookCommentHeaderLoader() {
  return (
    <header className="mb-2 flex align-items text-2xl font-bold tracking-normal overflow-hidden">
      <h2 className="text-2xl font-bold inline-flex items-center">코멘트</h2>
      <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
        <Skeleton className="ml-2 h-6 w-16" />
      </span>
      <div className="ml-auto text-base">
        <div className="my-3 ">
          <Skeleton className="ml-2 h-6 w-16" />
        </div>
      </div>
    </header>
  );
}
