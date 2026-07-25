'use client';

import { useCallback, MouseEvent } from 'react';

import { cn } from '@/shared/utils/class-name';

import { Star } from './star';

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
  className?: string;
}

const STAR_SIZE = 5;

export function Rating({ rating, onChange, className }: RatingProps) {
  const handleStar = useCallback(
    (event: MouseEvent<HTMLDivElement>, index: number) => {
      event.stopPropagation();
      onChange(index === rating ? rating - 1 : index);
    },
    [rating, onChange]
  );

  return (
    <div className={cn('w-full h-[40px]', className)}>
      <div className="w-full h-full grid grid-cols-5 text-[1rem]">
        {[...Array(STAR_SIZE)].map((_, index) => (
          <Star
            key={`star-${index + 1}`}
            index={index + 1}
            isClicked={rating >= index + 1}
            onClick={handleStar}
          />
        ))}
      </div>
    </div>
  );
}

