import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useMyBookTagService } from '@/service/my-book-tag/MyBookTagService';
import { useMyBookUpdateCache } from '@/hooks/my-book/useMyBookUpdateCache';
import useServiceInstance from '@/hooks/useServiceInstance';

export function useMyBookTagMutation() {
  const { addMyBookTagQueryData, removeMyBookTagQueryData } =
    useMyBookUpdateCache();
  const MyBookTagService = useServiceInstance(useMyBookTagService);

  const addMyBookTag = useMutation<
    ResponseRegisterMyBookTag,
    AxiosError<NestServerErrorType>,
    RequestRegisterMyBookTag
  >({
    mutationFn: (payload: RequestRegisterMyBookTag) =>
      MyBookTagService.create(payload),
    onSuccess: addMyBookTagQueryData,
  });

  const removeMyBookTag = useMutation<
    ResponseDeleteMyBookTag,
    AxiosError<NestServerErrorType>,
    RequestDeleteMyBookTag
  >({
    mutationFn: (payload: RequestDeleteMyBookTag) =>
      MyBookTagService.remove(payload),
    onSuccess: removeMyBookTagQueryData,
  });

  return { addMyBookTag, removeMyBookTag };
}
