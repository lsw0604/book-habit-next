import { createQueryKeys } from '@lukemorales/query-key-factory';

export const loginQueryKeys = createQueryKeys('login', {
  kakao: (code: string) => ({
    queryKey: [code],
  }),
});
