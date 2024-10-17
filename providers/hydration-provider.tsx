'use client';

import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface HydrationProviderProps {
  children: JSX.Element;
}

export default function HydrationProvider({
  children,
}: HydrationProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <HydrationBoundary state={queryClient}>{children}</HydrationBoundary>;
}
