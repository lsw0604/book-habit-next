import { useEffect, useCallback } from 'react';
import useToastHook from '@/hooks/toast/useToastHook';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useMyBookTagMutation from '@/queries/my-book-tag/useMyBookTagMutation';

export default function useMyBookTagRemove() {
  const { successToast } = useToastHook();
  const { removeMyBookTag } = useMyBookTagMutation();
  const { mutate, isSuccess, isError, error } = removeMyBookTag();

  const handleRemoveTag = useCallback((myBookTagId: number) => {
    mutate({ myBookTagId });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      successToast('태그가 삭제되었습니다.');
    }
  }, [isSuccess]);

  useErrorHandler(isError, error);

  return {
    handleRemoveTag,
  };
}
