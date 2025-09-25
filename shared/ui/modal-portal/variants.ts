export const MODAL_VARIANT = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: 0.3,
    },
  },
} as const;

export const BACKDROP_VARIANT = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
} as const;
