import KakaoLogin from '@/app/components/login/KakaoLogin';
import React from 'react';

export default function KakaoLoginPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return <KakaoLogin code={searchParams.code} />;
}
