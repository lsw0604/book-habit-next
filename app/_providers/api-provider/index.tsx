'use client';

import type { ReactNode } from 'react';

import { ensureApiInterceptor } from './ensure-interceptor';

// 모듈 로드 시점 = React 렌더보다 앞. 어떤 쿼리보다도 먼저 인터셉터가 붙는다.
ensureApiInterceptor();

export function ApiProvider({ children }: { children: ReactNode }) {
  return children;
}
