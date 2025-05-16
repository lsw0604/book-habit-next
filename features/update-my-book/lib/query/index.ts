import { myBookService } from '@/entities/my-book/api';
import {
  MyBookDetail,
  UpdateMyBookPayload,
} from '@/entities/my-book/api/types';
import { ErrorResponseDto } from '@/shared/api/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateMyBook = () => {
  const { updateMyBook } = myBookService;
  return useMutation<
    MyBookDetail,
    AxiosError<ErrorResponseDto>,
    UpdateMyBookPayload
  >({
    mutationFn: (payload: UpdateMyBookPayload) => updateMyBook(payload),
  });
};
