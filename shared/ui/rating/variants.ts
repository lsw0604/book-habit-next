import { Variants } from 'framer-motion';

export const STAR_VARIANTS: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      type: 'spring',
      stiffness: 220,
      damping: 15,
    },
  }),
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};


