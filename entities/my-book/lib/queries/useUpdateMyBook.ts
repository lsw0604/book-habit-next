import type {
  MyBookDetail,
  UpdateMyBookPayload,
} from '@/entities/my-book/api/types';
import type { ErrorResponseDto } from '@/shared/api/types/error';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookService } from '../../api';

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
