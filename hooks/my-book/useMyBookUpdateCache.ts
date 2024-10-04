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

  return {
    updateMyBookQueryData,
  };
};
