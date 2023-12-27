'use client';

import { RefObject, useState, useEffect } from 'react';

const observerOptions = {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
};

export default function useObserverHook<T extends HTMLDivElement>(
  ref: RefObject<T>
): { isVisible: boolean } {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current]);

  return { isVisible };
}
