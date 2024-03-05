import { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

import { IconStar } from '@/style/icon';

interface StarProps {
  i: number;
  isClicked: boolean;
}

const starVariants: Variants = {
  initial: {
    scale: 0,
  },
  animate: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: 'spring',
      stiffness: 175,
    },
  }),
  exit: (i: number) => ({
    scale: 0,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Star({ i, isClicked }: StarProps) {
  const starControls = useAnimation();

  useEffect(() => {
    if (isClicked) {
      starControls.start('animate');
    } else {
      starControls.start('exit');
    }
  }, [isClicked]);

  return (
    <>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#aaa] cursor-pointer" />
      {i !== 0 && (
        <motion.i
          variants={starVariants}
          animate={starControls}
          custom={i}
          initial="initial"
          className="relative z-10 cursor-pointer w-auto text-yellow-300 fill-yellow-300"
        >
          <IconStar className="h-8 w-8" />
        </motion.i>
      )}
    </>
  );
}
