import type { AxiosResponse } from 'axios';

import { tokenService } from '@/entities/auth/lib/token';
import { isClient } from '@/shared/utils/is-client';

export const extractAndSaveToken = (response: AxiosResponse) => {
  if (!isClient) return;

  const authHeader =
    response.headers.Authorization || response.headers.authorization;

  if (typeof authHeader === 'string') {
    const token = authHeader.split(' ')[1];
    if (token) {
      tokenService.setToken(token);
    }
  }
};
