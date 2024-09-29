import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { kakaoLoginAPI } from '@/service/auth';
import { queryKeys } from '@/constant/queries-key';

export default function useQueryKakao(code: string) {
  return useQuery<ResponseAuth, AxiosError<NestServerErrorType>>({
    queryKey: [queryKeys.auth.kakao(code)],
    queryFn: () => kakaoLoginAPI(code),
    enabled: !!code,
    retry: false,
  });
}
