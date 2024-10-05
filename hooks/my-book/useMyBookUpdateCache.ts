import { queryKeys } from '@/constant/queries-key';
import { useQueryClient } from '@tanstack/react-query';

export const useMyBookUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookQueryData = (response: ResponsePutMyBookDetail) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>([
        queryKeys.myBook.getDetail(response.id),
      ]);
    const newMyBookData = {
      ...previousMyBookData,
      ...response,
      rating: response.rating ?? previousMyBookData?.rating,
      status: response.status ?? previousMyBookData?.status,
    };
    return queryClient.setQueryData<ResponseGetMyBookDetail>(
      [queryKeys.myBook.getDetail(response.id)],
      newMyBookData
    );
  };

  const addMyBookTagQueryData = (response: ResponseRegisterMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>([
        queryKeys.myBook.getDetail(response.myBookId),
      ]);

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: [...(previousMyBookData.tag || []), response],
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        [queryKeys.myBook.getDetail(response.myBookId)],
        newMyBookTagData
      );
    }
  };

  const removeMyBookTagQueryData = (response: ResponseDeleteMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>([
        queryKeys.myBook.getDetail(response.myBookId),
      ]);

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: previousMyBookData.tag?.filter(
          (tag) => tag.myBookTagId !== response.myBookTagId
        ),
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        [queryKeys.myBook.getDetail(response.myBookId)],
        newMyBookTagData
      );
    }
  };

  return {
    updateMyBookQueryData,
    addMyBookTagQueryData,
    removeMyBookTagQueryData
  };
};
