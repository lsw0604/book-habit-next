import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import MyBookTagService from './MyBookTagService';
import { useMyBookUpdateCache } from '@/hooks/my-book/useMyBookUpdateCache';

export function useMyBookTagMutation() {
  const { addMyBookTagQueryData, removeMyBookTagQueryData } =
    useMyBookUpdateCache();

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
