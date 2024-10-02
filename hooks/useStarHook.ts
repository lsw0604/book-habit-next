import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { STAR_VARIANTS } from '@/constant/star-variant';

interface StarHookProps {
  isClicked: boolean;
}

export default function useStarHook({ isClicked }: StarHookProps) {
  const animation = useAnimation();

  useEffect(() => {
    animation.start(isClicked ? 'animate' : 'exit');
  }, [animation, isClicked]);

  return {
    animation,
    STAR_VARIANTS,
  };
}
