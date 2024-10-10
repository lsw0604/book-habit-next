import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { loginAPI } from '@/service/auth';

export default function useMutationLogin() {
  return useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestLogin
  >({
    mutationFn: (payload) => loginAPI(payload),
  });
}
