import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { loginAPI } from '@/service/auth';
import { queryKeys } from '@/constant/queries-key';

export default function useMutationLogin() {
  return useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestLogin
  >({
    mutationKey: [queryKeys.auth.login()],
    mutationFn: (payload) => loginAPI(payload),
  });
}
