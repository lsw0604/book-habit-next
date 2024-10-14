import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { addMyBookTagAPI, deleteMyBookTagAPI } from '@/service/my-book-tag';
import { useMyBookUpdateCache } from '@/hooks/my-book/useMyBookUpdateCache';
import useToastHook from '@/hooks/toast/useToastHook';

export default function useMyBookTagMutation() {
  const { addMyBookTagQueryData, removeMyBookTagQueryData } =
    useMyBookUpdateCache();
  const { successToast, errorToast } = useToastHook();
  const addMyBookTag = () => {
    return useMutation<
      ResponseRegisterMyBookTag,
      AxiosError<NestServerErrorType>,
      RequestRegisterMyBookTag
    >({
      mutationFn: (payload: RequestRegisterMyBookTag) =>
        addMyBookTagAPI(payload),
      onSuccess: (response: ResponseRegisterMyBookTag) => {
        addMyBookTagQueryData(response);
      },
    });
  };

  const removeMyBookTag = () => {
    return useMutation<
      ResponseDeleteMyBookTag,
      AxiosError<NestServerErrorType>,
      RequestDeleteMyBookTag
    >({
      mutationFn: (payload: RequestDeleteMyBookTag) =>
        deleteMyBookTagAPI(payload),
      onSuccess: (response: ResponseDeleteMyBookTag) => {
        removeMyBookTagQueryData(response);
        successToast('태그가 삭제되었습니다.');
      },
      onError: (error) => {
        if (error.response?.data.message) {
          errorToast(error.response?.data.message);
        }
      },
    });
  };

  return {
    addMyBookTag,
    removeMyBookTag,
  };
}
