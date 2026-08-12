import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/utils';

import type { MyBookReview } from '../../model';

type MyBookReviewTextType = Pick<MyBookReview, 'review'>;

interface MyBookReviewTextProps
  extends VariantProps<typeof reviewTextVariants> {
  myBookReview: MyBookReviewTextType;
  className?: string;
}

const reviewTextVariants = cva('text-sm text-foreground', {
  variants: {
    variant: {
      // 상세 보기용: 전체 텍스트, 줄바꿈 유지
      full: 'leading-relaxed whitespace-pre-wrap break-words',
      // 목록 카드용: 2줄까지만 보여주고 말줄임 처리
      truncated:
        'leading-relaxed line-clamp-2 whitespace-pre-wrap break-words',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

export function MyBookReviewText({
  myBookReview,
  variant = 'full',
  className,
}: MyBookReviewTextProps) {
  const { review } = myBookReview;

  if (!review) {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>
        등록된 한줄평이 없습니다.
      </p>
    );
  }

  return (
    <p className={cn(reviewTextVariants({ variant }), className)}>
      {review}
    </p>
  );
}
