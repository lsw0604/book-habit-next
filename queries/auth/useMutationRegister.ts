import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { registerAPI } from '@/service/auth';

export default function useMutationRegister() {
  return useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestRegister
  >({
    mutationFn: (payload) => registerAPI(payload),
  });
}
