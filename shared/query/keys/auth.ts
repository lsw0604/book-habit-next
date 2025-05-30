import { createQueryKeys } from '@lukemorales/query-key-factory';

export const authQueryKeys = createQueryKeys('auth', {
  kakao: (code: string) => ({
    queryKey: [code],
  }),
});
