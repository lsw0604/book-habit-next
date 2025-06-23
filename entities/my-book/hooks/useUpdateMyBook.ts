import { type UpdateMyBookPayload, myBookService } from '../api';
import { type MyBookDetail, toMyBookDetailViewModel } from '../model';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useUpdateMyBook = () => {
  const { updateMyBook } = myBookService;
  return useMutation<
    MyBookDetail,
    AxiosError<ErrorResponseDTO>,
    UpdateMyBookPayload
  >({
    mutationFn: async (payload: UpdateMyBookPayload) => {
      const myBookDetailDTO = await updateMyBook(payload);
      return toMyBookDetailViewModel(myBookDetailDTO);
    },
  });
};
