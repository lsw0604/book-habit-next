import { motion } from 'framer-motion';
import { MouseEvent, memo } from 'react';

import { cn } from '@/shared/utils/class-name';
import { IconStar } from '@/style/icon';

import { STAR_VARIANTS } from './variants';

export interface StarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  index: number;
  isClicked: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>, index: number) => void;
}

function Star({ index, isClicked, onClick }: StarProps) {
  return (
    <motion.div
      className={cn(
        'relative w-auto flex justify-center items-center cursor-pointer',
      )}
      onClick={(event) => onClick(event, index)}
    >
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gray-300 cursor-pointer" />
      <motion.i
        variants={STAR_VARIANTS}
        animate={isClicked ? 'animate' : 'exit'}
        custom={index}
        className="relative z-10 cursor-pointer w-auto text-yellow-300"
      >
        <IconStar className="h-8 w-8 fill-yellow-300" />
      </motion.i>
    </motion.div>
  );
}

export default memo(Star);
