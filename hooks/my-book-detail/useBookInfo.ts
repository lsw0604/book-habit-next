import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function useBookInfo() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  const onClickTag = (tag: string, type: 'person' | 'publisher' | 'isbn') => {
    router.push(`/search?query=${tag}&target=${type}&sort=accuracy`);
  };

  return {
    isOpen,
    openHandler,
    createMarkup,
    onClickTag,
  };
}
