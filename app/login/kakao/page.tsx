import React from 'react';

import KakaoLogin from '@/app/components/login/KakaoLogin';

export default function KakaoLoginPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  return <KakaoLogin code={searchParams.code} />;
}
