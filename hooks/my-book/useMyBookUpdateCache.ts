import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queries/query-key';

export const useMyBookUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookQueryData = (response: ResponsePutMyBookDetail) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail(response.id).queryKey
      );
    console.log(previousMyBookData);
    const newMyBookData = {
      ...previousMyBookData,
      ...response,
      rating: response.rating ?? previousMyBookData?.rating,
      status: response.status ?? previousMyBookData?.status,
    };
    return queryClient.setQueryData<ResponseGetMyBookDetail>(
      queryKeys.myBook.detail(response.id).queryKey,
      newMyBookData
    );
  };

  const addMyBookTagQueryData = (response: ResponseRegisterMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail(response.myBookId).queryKey
      );

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: [...(previousMyBookData.tag || []), response],
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail(response.myBookId).queryKey,
        newMyBookTagData
      );
    }
  };

  const removeMyBookTagQueryData = (response: ResponseDeleteMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail(response.myBookId).queryKey
      );

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: previousMyBookData.tag?.filter(
          (tag) => tag.myBookTagId !== response.myBookTagId
        ),
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail(response.myBookId).queryKey,
        newMyBookTagData
      );
    }
  };

  return {
    updateMyBookQueryData,
    addMyBookTagQueryData,
    removeMyBookTagQueryData,
  };
};
