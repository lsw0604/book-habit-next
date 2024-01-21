import { cn } from '@/lib/utils';

interface CommentItemContentProps {
  content: string;
  detail?: boolean;
}

export default function CommentItemContent({
  content,
  detail,
}: CommentItemContentProps) {
  return (
    <div
      className={cn(
        'w-full text-lg h-auto min-h-24 whitespace-pre-line',
        detail && 'h-28 overflow-hidden flex flex-col'
      )}
    >
      {content}
    </div>
  );
}
