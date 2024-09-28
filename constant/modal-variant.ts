export const MODAL_VARIANT = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '100%',
  },
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    duration: 0.5,
  },
};
