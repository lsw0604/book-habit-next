import { useEffect } from 'react';
import { cn } from '@/shared/utils/class-name';
import { useAnimation, motion } from 'framer-motion';
import { STAR_VARIANTS } from './constants';
import { IconStar } from '@/style/icon';
import { StarProps } from './types';

export default function Star({ index, isClicked, onClick }: StarProps) {
  const animation = useAnimation();

  useEffect(() => {
    animation.start(isClicked ? 'animate' : 'exit');
  }, [animation, isClicked]);

  return (
    <motion.div
      className={cn(
        'relative w-auto flex justify-center items-center cursor-pointer'
      )}
      key={index}
      onClick={event => onClick(event, index)}
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
}
