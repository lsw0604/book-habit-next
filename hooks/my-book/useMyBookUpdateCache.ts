import type {
  ResponsePutMyBook,
  ResponseGetMyBook,
} from '@/service/api/my-book/types';

import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queries';

export const useMyBookUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookQueryData = (response: ResponsePutMyBook) => {
    const previousMyBookData = queryClient.getQueryData<ResponseGetMyBook>(
      queryKeys.myBook.detail({ myBookId: response.id }).queryKey
    );

    const newMyBookData = {
      ...previousMyBookData,
      ...response,
      rating: response.rating ?? previousMyBookData?.rating,
      status: response.status ?? previousMyBookData?.status,
    };
    return queryClient.setQueryData<ResponseGetMyBook>(
      queryKeys.myBook.detail({ myBookId: response.id }).queryKey,
      newMyBookData
    );
  };

  const addMyBookTagQueryData = (response: ResponseRegisterMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail({ myBookId: response.myBookId }).queryKey
      );

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: [...(previousMyBookData.tag || []), response],
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail({ myBookId: response.myBookId }).queryKey,
        newMyBookTagData
      );
    }
  };

  const removeMyBookTagQueryData = (response: ResponseDeleteMyBookTag) => {
    const previousMyBookData =
      queryClient.getQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail({ myBookId: response.myBookId }).queryKey
      );

    if (previousMyBookData) {
      const newMyBookTagData = {
        ...previousMyBookData,
        tag: previousMyBookData.tag?.filter(
          tag => tag.myBookTagId !== response.myBookTagId
        ),
      };

      return queryClient.setQueryData<ResponseGetMyBookDetail>(
        queryKeys.myBook.detail({ myBookId: response.myBookId }).queryKey,
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
