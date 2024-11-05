import { useCallback } from 'react';
import { useMyBookTagMutation } from '@/service/my-book-tag/useMyBookTagService';

export default function useMyBookTagRemove() {
  const {
    removeMyBookTag: { mutate },
  } = useMyBookTagMutation();

  const handleRemoveTag = useCallback((myBookTagId: number) => {
    mutate(myBookTagId);
  }, []);

  return {
    handleRemoveTag,
  };
}
