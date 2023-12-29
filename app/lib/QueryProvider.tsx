'use client';

import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'queries';

interface IProps {
  children: JSX.Element;
}

export default function QueryProvider({ children }: IProps) {
  const [QueryClient] = useState(queryClient);
  return (
    <QueryClientProvider client={QueryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
