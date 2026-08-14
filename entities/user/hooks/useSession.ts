'use client';

import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { userQueryKeys, userService, type AccessDTO } from '../api';
import { toUserViewModel } from '../lib';
import type { User } from '../model';

/**
 * 현재 로그인 세션을 확인한다. /api/auth/access는 인증된 요청에만 200으로
 * { user }를 반환하고, 그 외에는 401을 던지는 보호된 엔드포인트다.
 * 즉 쿼리 성공(data 존재) = 인증됨, 실패(401 등, data는 undefined) = 미인증이다.
 * 인증 여부/사용자 정보를 다시 조회할 필요가 없다면 서버가 아닌 이 쿼리의 캐시가
 * 유일한 참조 지점이 되어야 한다 (Redux에 복제하지 않는다).
 */
export const useSession = () => {
  const { access } = userService;

  return useQuery<AccessDTO, APIError, User>({
    queryKey: userQueryKeys.access.queryKey,
    queryFn: access,
    select: response => toUserViewModel(response.user),
    staleTime: 5 * 60 * 1000,
  });
};
