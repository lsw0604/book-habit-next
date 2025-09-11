import { cva, VariantProps } from 'class-variance-authority';
import { MessageSquareTextIcon } from 'lucide-react';

import { cn, truncateText } from '@/shared/utils';

import type { MyBookHistory } from '../../model';

type MyBookHistoryMemoType = Pick<MyBookHistory, 'memo'>;

interface MyBookHistoryMemoProps
  extends VariantProps<typeof memoParagraphVariants> {
  history: MyBookHistoryMemoType;
  maxLength?: number;
  className?: string;
}

const memoParagraphVariants = cva('text-sm text-foreground', {
  variants: {
    variant: {
      // 상세 보기용: 전체 텍스트, 줄바꿈 유지
      full: 'leading-relaxed whitespace-pre-wrap break-words',
      // 요약 보기용: 한 줄로 표시하고, 넘칠 경우 ... 처리
      truncated: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

export function MyBookHistoryMemo({
  history,
  maxLength = 70,
  variant = 'full',
  className,
}: MyBookHistoryMemoProps) {
  const { memo } = history;

  if (!memo) {
    return (
      <div className={cn('bg-muted border rounded-lg p-3', className)}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <MessageSquareTextIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">메모</span>
        </div>
        <p className="text-sm text-muted-foreground">등록된 메모가 없습니다.</p>
      </div>
    );
  }

  const displayedMemo =
    variant === 'truncated' ? truncateText(memo, maxLength) : memo;

  return (
    <div className={cn('bg-muted border rounded-lg p-3', className)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <MessageSquareTextIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">메모</span>
      </div>
      <p className={memoParagraphVariants({ variant })}>{displayedMemo}</p>
    </div>
  );
}
