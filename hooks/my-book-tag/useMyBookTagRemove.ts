import { useCallback } from 'react';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';

export default function useMyBookTagRemove() {
  const { removeMyBookTag } = useMyBookTagMutation();
  const { mutate } = removeMyBookTag();

  const handleRemoveTag = useCallback((myBookTagId: number) => {
    mutate({ myBookTagId });
  }, []);

  return {
    handleRemoveTag,
  };
}
