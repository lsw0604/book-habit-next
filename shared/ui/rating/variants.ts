import { Variants } from 'framer-motion';

export const STAR_VARIANTS: Variants = {
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
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
};
