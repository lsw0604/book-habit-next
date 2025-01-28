'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authEvents } from '@/events/auth';

export function HTTPEventHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    authEvents.emitSessionExpired(() => router.push);
    authEvents.onSessionExpired();
    const unsubscribeSessionExpired = authEvents.on('SESSION_EXPIRED', () => {
      // 세션 만료 처리
      router.push('/login');
    });

    const unsubscribeNetworkError = authEvents.on('NETWORK_ERROR', () => {
      // 네 트워크 에러 처리
      console.error('Network connection lost');
    });

    // 요청 로깅
    const unsubscribeRequestStart = authEvents.on('REQUEST_START', (data) => {
      console.log(`Request started: ${data.method} ${data.url}`);
    });

    return () => {
      unsubscribeSessionExpired();
      unsubscribeNetworkError();
      unsubscribeRequestStart();
    };
  }, [router]);

  return children;
}
