'use client';

import { MouseEvent, useCallback } from 'react';
import { motion } from 'framer-motion';

import useStarHook from '@/hooks/useStarHook';
import { IconStar } from '@/style/icon';
import { cn } from '@/utils/class-name';

interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
  className?: string;
}

interface StarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  index: number;
  isClicked: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>, index: number) => void;
}

const STAR_SIZE = 5;

export default function Rating({ rating, onChange, className }: RatingProps) {
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
            key={index + 1}
            index={index + 1}
            isClicked={rating >= index + 1}
            onClick={handleStar}
          />
        ))}
      </div>
    </div>
  );
}

const Star = ({ index, isClicked, onClick }: StarProps) => {
  const { STAR_VARIANTS, animation } = useStarHook({ isClicked });

  return (
    <motion.div
      className={cn(
        'relative w-auto flex justify-center items-center cursor-pointer'
      )}
      key={index}
      onClick={(event) => onClick(event, index)}
    >
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gray-300 cursor-pointer" />

      <motion.i
        variants={STAR_VARIANTS}
        animate={animation}
        custom={index}
        initial="initial"
        className="relative z-10 cursor-pointer w-auto text-yellow-300"
      >
        <IconStar className="h-8 w-8 fill-yellow-300" />
      </motion.i>
    </motion.div>
  );
};
